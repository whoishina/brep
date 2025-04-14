import fs from "fs";
import path from "path";
import prompts from "prompts";
import chalk from "chalk";

export default async function createNewPage() {
  // Ask for the page name and path
  const response = await prompts([
    {
      type: "text",
      name: "pageName",
      message: "Enter the page name (e.g., About, BlogPost):",
      validate: (value) => {
        if (!value) return "Page name is required";
        if (!/^[A-Za-z0-9]+$/.test(value)) {
          return "Only letters and numbers are allowed in page name";
        }
        return true;
      },
    },
    {
      type: "text",
      name: "pagePath",
      message: "Enter the page path (e.g., about, blog/post, user/:id):",
      validate: (value) => {
        if (!value) return "Page path is required";
        if (!/^[a-z0-9/:-]+$/.test(value)) {
          return "Only lowercase letters, numbers, hyphens, colons (for path variables), and forward slashes are allowed in path";
        }
        return true;
      },
    },
  ]);

  if (!response.pageName || !response.pagePath) {
    console.log(chalk.red("Page creation cancelled"));
    return;
  }

  const pagePath = response.pagePath;
  const pageComponentName = response.pageName;

  // Clean path for filesystem (replace :param with _param for directory structure)
  const fsPagePath = pagePath.replace(
    /:[a-zA-Z0-9]+/g,
    (match) => `_${match.substring(1)}`
  );

  // Create the page directory
  const pageDir = path.join(process.cwd(), "src/frontend/pages", fsPagePath);
  fs.mkdirSync(pageDir, { recursive: true });

  // Read the template
  const templatePath = path.join(process.cwd(), ".brep/templates/page.tsx.tpl");
  let templateContent = "";
  try {
    templateContent = fs.readFileSync(templatePath, "utf-8");
  } catch (error) {
    console.error(chalk.red("Error reading template file:") + " " + error);
    return;
  }

  // Replace placeholders
  const pageContent = templateContent.replace(
    /{{pageName}}/g,
    pageComponentName
  );

  // Create the page component file
  const pageFile = path.join(pageDir, "index.tsx");
  fs.writeFileSync(pageFile, pageContent);

  // Create the index file with correct reference to the .tsx file
  const indexContent = `export { default } from "./index.tsx";\n`;
  fs.writeFileSync(path.join(pageDir, "index.ts"), indexContent);

  // Update router.tsx
  const routerPath = path.join(process.cwd(), "src/frontend/router.tsx");
  let routerContent = fs.readFileSync(routerPath, "utf-8");

  // Make sure the routes import exists
  if (!routerContent.includes("import { routes }")) {
    // Add routes import if it doesn't exist
    routerContent = `import { routes } from "../config/routes.config";\n${routerContent}`;
  }

  // Import the new page component at the top of the file
  const importStatement = `import ${pageComponentName}Page from "./pages/${fsPagePath}";\n`;
  const lastImportIndex = routerContent.lastIndexOf("import");
  if (lastImportIndex !== -1) {
    let endOfImportsIndex = routerContent.indexOf("\n", lastImportIndex);
    while (routerContent.charAt(endOfImportsIndex + 1) === "i") {
      endOfImportsIndex = routerContent.indexOf("\n", endOfImportsIndex + 1);
    }
    routerContent =
      routerContent.slice(0, endOfImportsIndex + 1) +
      importStatement +
      routerContent.slice(endOfImportsIndex + 1);
  } else {
    routerContent = importStatement + routerContent;
  }

  // Find the children array in the router
  const childrenMatch = routerContent.match(/children:\s*\[([\s\S]*?)\s*\]/);
  if (childrenMatch && childrenMatch.index !== undefined) {
    // Get the route path from routes.config.ts dynamically
    const routeVarName = getRouteVarName(pagePath);

    const newRoute = `{
        path: routes.${routeVarName},
        element: <${pageComponentName}Page />,
      },`;

    // Find the position to insert the new route
    const childrenEnd = childrenMatch.index + childrenMatch[0].lastIndexOf("]");

    // Insert the new route before the closing bracket
    routerContent =
      routerContent.substring(0, childrenEnd) +
      (childrenMatch[1].trim() ? "\n      " : "") +
      newRoute +
      routerContent.substring(childrenEnd);

    fs.writeFileSync(routerPath, routerContent);
  } else {
    console.error(chalk.red("Could not find children array in router.tsx"));
  }

  // Update routes.config.ts
  const routesPath = path.join(process.cwd(), "src/config/routes.config.ts");
  const routesContent = fs.readFileSync(routesPath, "utf-8");

  // Find the routes object
  const routesMatch = routesContent.match(
    /export const routes = {([\s\S]*?)};/
  );
  if (routesMatch) {
    // Extract the base path without parameters for route configuration
    const processedPath = cleanPathForRouteKey(pagePath);
    const pathParts = processedPath.split("/");

    let newRoute = "";
    let updatedContent = routesContent;

    if (pathParts.length === 1) {
      // Simple non-nested route
      // Check if the route already exists
      const routeExists = new RegExp(
        `\\s*${pathParts[0]}:\\s*["'].*["'],`
      ).test(routesContent);

      if (!routeExists) {
        newRoute = `\n  ${pathParts[0]}: "/${pagePath}",`;
        updatedContent = routesContent.replace(/(\s*)};/, `${newRoute}\n$1};`);
      }
    } else {
      // Nested route
      const parentPath = pathParts[0];

      // Check if parent path already exists in routes
      const parentPattern = `${parentPath}:\\s*{([\\s\\S]*?)}`;
      const parentRegex = new RegExp(parentPattern, "g");
      const parentMatch = parentRegex.exec(routesContent);

      if (parentMatch) {
        // Parent exists, check if child already exists
        const routeKey = pathParts.slice(1).join("_");
        const childExists = new RegExp(`\\s*${routeKey}:\\s*["'].*["'],`).test(
          parentMatch[1]
        );

        if (!childExists) {
          // Add child to existing parent
          const parentContent = parentMatch[1];
          const updatedParentContent =
            parentContent + `\n    ${routeKey}: "/${pagePath}",`;
          updatedContent = routesContent.replace(
            parentContent,
            updatedParentContent
          );
        }
      } else {
        // Parent doesn't exist, create nested structure
        // First check if the parent is declared but empty
        const emptyParentPattern = `${parentPath}:\\s*{\\s*}`;
        const emptyParentRegex = new RegExp(emptyParentPattern);
        const emptyParentMatch = emptyParentRegex.test(routesContent);

        if (emptyParentMatch) {
          // Parent exists but is empty, fill it
          const routeKey = pathParts.slice(1).join("_");
          const updatedParent = `${parentPath}: {\n    ${routeKey}: "/${pagePath}",\n  }`;
          updatedContent = routesContent.replace(
            new RegExp(`${parentPath}:\\s*{\\s*}`),
            updatedParent
          );
        } else {
          // Parent doesn't exist at all, create it
          const routeKey = pathParts.slice(1).join("_");
          newRoute = `\n  ${parentPath}: {\n    ${routeKey}: "/${pagePath}",\n  },`;
          updatedContent = routesContent.replace(
            /(\s*)};/,
            `${newRoute}\n$1};`
          );
        }
      }
    }

    if (updatedContent !== routesContent) {
      fs.writeFileSync(routesPath, updatedContent);
    }
  }

  console.log(chalk.green("\nPage created successfully!"));
  console.log(chalk.blue("\nFiles created:"));
  console.log(chalk.white(`  - ${pageFile}`));
  console.log(chalk.white(`  - ${path.join(pageDir, "index.ts")}`));
  console.log(chalk.blue("\nFiles updated:"));
  console.log(chalk.white(`  - ${routerPath}`));
  console.log(chalk.white(`  - ${routesPath}`));
  console.log(
    chalk.yellow("\nYou can now access the page at:") +
      " " +
      chalk.green(`/${pagePath}`)
  );
}

/**
 * Get the route variable name for the router based on the page path
 */
function getRouteVarName(pagePath: string): string {
  // Clean the path before processing route names
  const cleanPath = cleanPathForRouteKey(pagePath);
  const pathParts = cleanPath.split("/");

  // For a non-nested path
  if (pathParts.length === 1) {
    return `${pathParts[0]}`;
  }

  // For a nested path like blog/about
  const parentPath = pathParts[0];
  const childPath = pathParts.slice(1).join("_");

  return `${parentPath}.${childPath}`;
}

/**
 * Clean path for route key generation by removing parameter indicators
 * e.g., 'user/:id/profile' becomes 'user/id/profile'
 */
function cleanPathForRouteKey(pagePath: string): string {
  return pagePath.replace(/:[a-zA-Z0-9]+/g, (match) => match.substring(1));
}

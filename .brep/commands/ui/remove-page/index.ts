import fs from "fs";
import path from "path";
import prompts from "prompts";
import chalk from "chalk";

type RouteValue =
  | string
  | ((id: string) => string)
  | { [key: string]: RouteValue };

/**
 * Get a flat list of all available page paths
 */
function getAllPagePaths(
  obj: { [key: string]: RouteValue },
  prefix: string = ""
): string[] {
  let result: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      result.push(value);
    } else if (typeof value === "function") {
      const routePath = value(":id");
      result.push(routePath);
    } else {
      // Handle nested objects
      const nestedPaths = getAllPagePaths(value, `${prefix}${key}.`);
      result = result.concat(nestedPaths);
    }
  }

  return result;
}

export default async function removePage() {
  // Load routes configuration dynamically
  const routesPath = path.join(process.cwd(), "src/config/routes.config.ts");
  const routesModule = await import(routesPath);
  const routes = routesModule.routes;

  // Get all available routes
  const availableRoutes = getAllPagePaths(routes);

  // Filter out non-page routes
  const pageRoutes = availableRoutes.filter((route) => {
    const pagePath = route.startsWith("/") ? route.substring(1) : route;
    const pageDir = path.join(process.cwd(), "src/frontend/pages", pagePath);
    return fs.existsSync(pageDir);
  });

  if (pageRoutes.length === 0) {
    console.log(chalk.yellow("No pages found to remove."));
    return;
  }

  // Ask user which page to remove
  const response = await prompts({
    type: "select",
    name: "pagePath",
    message: "Select the page to remove:",
    choices: pageRoutes.map((route) => ({
      title: route,
      value: route,
    })),
  });

  if (!response.pagePath) {
    console.log(chalk.red("Page removal cancelled"));
    return;
  }

  const pagePath = response.pagePath.startsWith("/")
    ? response.pagePath.substring(1)
    : response.pagePath;

  // Find the page component name from router.tsx
  const routerPath = path.join(process.cwd(), "src/frontend/router.tsx");
  const routerContent = fs.readFileSync(routerPath, "utf-8");

  const pageDir = path.join(process.cwd(), "src/frontend/pages", pagePath);

  // Confirm before deletion
  const confirmResponse = await prompts({
    type: "confirm",
    name: "confirmed",
    message: `Are you sure you want to remove the page at ${chalk.yellow(
      pageDir
    )}?`,
    initial: false,
  });

  if (!confirmResponse.confirmed) {
    console.log(chalk.red("Page removal cancelled"));
    return;
  }

  // Remove the page directory
  try {
    if (fs.existsSync(pageDir)) {
      fs.rmSync(pageDir, { recursive: true, force: true });
      console.log(chalk.green(`Removed page directory: ${pageDir}`));
    }
  } catch (error) {
    console.error(chalk.red(`Error removing page directory: ${error}`));
  }

  // Remove from router.tsx
  try {
    // Find the page component name from the router file
    const componentNameRegex = new RegExp(
      `import\\s+([A-Za-z0-9]+)Page\\s+from\\s+["']\\./pages/${pagePath}["']`,
      "i"
    );
    const componentNameMatch = routerContent.match(componentNameRegex);
    const componentName = componentNameMatch ? componentNameMatch[1] : null;

    // Get the route key from the routes object
    const routeKey = getRouteKeyFromPath(routes, response.pagePath);

    // Remove the route from the router - handle both string literals and routes object
    const routeRegexString = routeKey
      ? `\\s*{\\s*path:\\s*(routes\\.${routeKey}|"${response.pagePath}"),[\\s\\S]*?},`
      : `\\s*{\\s*path:\\s*"${response.pagePath}",[\\s\\S]*?},`;

    const routeRegex = new RegExp(routeRegexString, "g");
    let updatedRouterContent = routerContent.replace(routeRegex, "");

    // Remove the import statement if component name was found
    if (componentName) {
      const importRegex = new RegExp(
        `import\\s+${componentName}Page\\s+from\\s+["']\\./pages/${pagePath}["'];?\\n`,
        "g"
      );
      updatedRouterContent = updatedRouterContent.replace(importRegex, "");
    }

    if (updatedRouterContent !== routerContent) {
      fs.writeFileSync(routerPath, updatedRouterContent);
      console.log(
        chalk.green(
          `Updated router.tsx - removed route and import for: ${response.pagePath}`
        )
      );
    } else {
      console.log(
        chalk.yellow(
          `No route found in router.tsx for: ${response.pagePath}. Component may need manual removal.`
        )
      );
    }
  } catch (error) {
    console.error(chalk.red(`Error updating router.tsx: ${error}`));
  }

  // Remove from routes.config.ts
  try {
    const routesContent = fs.readFileSync(routesPath, "utf-8");

    // This is a simplistic approach - for a more robust solution, a typescript
    // parser would be better, but this handles most common cases
    const routeKey = getRouteKeyFromPath(routes, response.pagePath);

    if (routeKey) {
      // Handle simple routes like "chat: '/chat',"
      const simpleRouteRegex = new RegExp(
        `\\s*${routeKey}:\\s*"${response.pagePath}",\\n`,
        "g"
      );
      let updatedRoutesContent = routesContent.replace(simpleRouteRegex, "");

      // Handle nested routes
      const parts = routeKey.split(".");
      if (parts.length > 1) {
        const childKey = parts[1];

        // Remove just the child route
        const childRouteRegex = new RegExp(
          `\\s*${childKey}:\\s*"${response.pagePath}",\\n`,
          "g"
        );
        updatedRoutesContent = updatedRoutesContent.replace(
          childRouteRegex,
          ""
        );
      }

      if (updatedRoutesContent !== routesContent) {
        fs.writeFileSync(routesPath, updatedRoutesContent);
        console.log(
          chalk.green(
            `Updated routes.config.ts - removed route definition for: ${routeKey}`
          )
        );
      }
    }
  } catch (error) {
    console.error(chalk.red(`Error updating routes.config.ts: ${error}`));
  }

  console.log(chalk.green("\nPage removed successfully!"));
}

/**
 * Get the route key from the routes object using the path
 */
function getRouteKeyFromPath(
  obj: { [key: string]: RouteValue },
  targetPath: string,
  prefix: string = ""
): string | null {
  // Normalize the target path
  const normalizedTargetPath = targetPath.startsWith("/")
    ? targetPath
    : `/${targetPath}`;

  for (const [key, value] of Object.entries(obj)) {
    if (
      typeof value === "string" &&
      (value === targetPath || value === normalizedTargetPath)
    ) {
      return prefix ? `${prefix}.${key}` : key;
    } else if (typeof value === "function") {
      const routePath = value(":id");
      if (routePath === targetPath || routePath === normalizedTargetPath) {
        return prefix ? `${prefix}.${key}` : key;
      }
    } else if (typeof value === "object") {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      const result = getRouteKeyFromPath(value, targetPath, newPrefix);
      if (result) return result;
    }
  }

  // If not found directly, try to construct from the path parts
  if (!prefix) {
    const pathParts = targetPath.startsWith("/")
      ? targetPath.substring(1).split("/")
      : targetPath.split("/");

    if (pathParts.length > 1) {
      // For paths like "blog/about", try to construct "blog.about"
      const parentKey = pathParts[0];
      if (obj[parentKey] && typeof obj[parentKey] === "object") {
        const childKey = pathParts.slice(1).join("_");
        // Check if this key exists in parent object
        if (obj[parentKey][childKey]) {
          return `${parentKey}.${childKey}`;
        }
      }
    }
  }

  return null;
}

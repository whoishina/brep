import { routes } from "../../../../src/config/routes.config";
import fs from "fs";
import path from "path";
import chalk from "chalk";

type RouteValue =
  | string
  | ((id: string) => string)
  | { [key: string]: RouteValue };

function findComponentFile(componentName: string): string {
  // Common component locations
  const possiblePaths = [
    path.join(process.cwd(), "src/frontend/pages"),
    path.join(process.cwd(), "src/frontend/layouts"),
    path.join(process.cwd(), "src/frontend/components"),
  ];

  for (const basePath of possiblePaths) {
    if (!fs.existsSync(basePath)) continue;

    // Search recursively in each directory
    function searchDir(dir: string): string | null {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          const result = searchDir(fullPath);
          if (result) return result;
        } else if (file.toLowerCase().includes(componentName.toLowerCase())) {
          return fullPath;
        }
      }
      return null;
    }

    const found = searchDir(basePath);
    if (found) return found;
  }
  return "Not found";
}

function displayRoutes(
  obj: { [key: string]: RouteValue },
  prefix: string = ""
) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      console.log(`${prefix}${chalk.cyan(key)}: ${chalk.green(value)}`);
    } else if (typeof value === "function") {
      const routePath = value(":id");
      console.log(`${prefix}${chalk.cyan(key)}: ${chalk.green(routePath)}`);
    } else {
      console.log(`${prefix}${chalk.cyan(key)}:`);
      displayRoutes(value, prefix + "  ");
    }
  }
}

export default function showFrontendRoutes() {
  // Read and parse router.tsx
  const routerPath = path.join(process.cwd(), "src/frontend/router.tsx");
  const routerContent = fs.readFileSync(routerPath, "utf-8");

  // Extract route information using regex
  const layoutMatch = routerContent.match(/element:\s*<(\w+)Layout/);
  const childrenMatch = routerContent.match(/children:\s*\[([\s\S]*?)\]/);
  let currentPage = "";
  let currentPath = "";

  console.log("\n" + chalk.bold.blue("Routes from router.tsx:"));
  console.log(chalk.blue("=".repeat(50)));

  if (layoutMatch) {
    const layoutName = layoutMatch[1];
    const layoutFile = findComponentFile(layoutName);
    console.log(
      chalk.yellow("Layout:") + " " + chalk.green(`${layoutName}Layout`)
    );
    console.log(chalk.gray("  File:") + " " + chalk.white(layoutFile));
  }

  if (childrenMatch) {
    const childrenContent = childrenMatch[1];
    const pathMatch = childrenContent.match(/path:\s*([^,]+)/);
    const elementMatch = childrenContent.match(/element:\s*<(\w+)Page/);

    if (pathMatch && elementMatch) {
      currentPage = elementMatch[1];
      currentPath = pathMatch[1].trim();
      const pageFile = findComponentFile(currentPage);

      console.log(chalk.yellow("Routes:"));
      console.log(
        "  " +
          chalk.cyan(currentPath) +
          ": " +
          chalk.green(`${currentPage}Page`)
      );
      console.log(chalk.gray("    File:") + " " + chalk.white(pageFile));
    }
  }

  // Display routes from routes.config.ts
  console.log("\n" + chalk.bold.blue("Routes from routes.config.ts:"));
  console.log(chalk.blue("=".repeat(50)));
  displayRoutes(routes);

  // Display summary
  console.log("\n" + chalk.bold.blue("Summary:"));
  console.log(chalk.blue("=".repeat(50)));
  console.log(
    chalk.yellow("Total Routes:") +
      " " +
      chalk.green(Object.keys(routes).length)
  );
  console.log(
    chalk.yellow("Layout:") +
      " " +
      chalk.green(layoutMatch ? `${layoutMatch[1]}Layout` : "None")
  );
  console.log(
    chalk.yellow("Pages:") +
      " " +
      chalk.green(currentPage ? `${currentPage}Page` : "None")
  );
}

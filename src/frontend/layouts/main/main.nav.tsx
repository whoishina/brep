import { routes } from "@/config/routes.config";
import { Link } from "react-router-dom";

export default function MainNav() {
  return (
    <div className="flex items-center">
      <Link to={routes.home.root} className="font-bold text-sm lg:text-base">
        Bun + React + Elysia + Prisma Stack Boilerplate
      </Link>
    </div>
  );
}

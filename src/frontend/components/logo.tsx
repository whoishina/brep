import { routes } from "@/config/routes.config";
import { siteConfig } from "@/config/site.config";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={routes.home.root} >
      <div className="flex items-center overflow-hidden">
        <img src={'https://lucide.dev/logo.dark.svg'} className="w-10 p-1" />
        <span className="font-bold ms-2">{siteConfig.name}</span>
      </div>
    </Link>
  )
}

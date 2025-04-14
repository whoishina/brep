import { Environment } from "./environment.config";

export const siteConfig = {
  name: import.meta.env[Environment.app.name] || "Site name",
  tagLine: import.meta.env[Environment.app.tagLine] || "",
  domain: import.meta.env[Environment.app.domain] || "",
  ssl: {},
  color: {
    primary: '#EE953B'
  }
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};
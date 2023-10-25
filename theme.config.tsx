import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import ArkantumLogo from "./components/arkantum-logo";

const config: DocsThemeConfig = {
  logo: <ArkantumLogo />,
  project: {
    link: "https://github.com/arkantum-labs/docs",
  },
  chat: {
    link: "https://discord.gg/PqJraGqr",
  },
  docsRepositoryBase: "https://github.com/arkantum-labs/docs",
  footer: {
    text: "",
  },
};

export default config;

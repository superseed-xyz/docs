import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import ArkantumLogo from "./components/arkantum-logo";

const config: DocsThemeConfig = {
  logo: <ArkantumLogo />,
  project: {
    link: "https://github.com/arkantum-labs",
  },
  chat: {
    link: "https://discord.gg/PqJraGqr",
  },
  editLink: {
    text: 'Edit this page on GitHub →'
  },
  feedback: {
    content: 'Submit an issue on Github →',
    labels: 'feedback'
  },
  docsRepositoryBase: "https://github.com/arkantum-labs/docs/tree/main",
  useNextSeoProps: () => ({titleTemplate: '%s - Arkantum Docs'}),
  head: (
    <>
      <link rel="favicon" href="favicon/favicon.ico" />
    </>
  ),
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://arkantum.com" target="_blank">
          Arkantum Labs
        </a>
        .
      </span>
    ),
  },
  sidebar: {
    toggleButton: true,
  },
};

export default config;

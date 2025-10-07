import type { MDXComponents } from "nextra/mdx-components";
import { useMDXComponents as useDocsMDXComponents } from "nextra-theme-docs";

export function useMDXComponents(components: MDXComponents) {
  return useDocsMDXComponents({
    ...components,
  });
}

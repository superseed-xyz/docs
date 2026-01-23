"use client";

import type { ReactNode } from "react";
type PageMapItem = any;
import { Layout } from "nextra-theme-docs";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type DocsLayoutProps = {
  pageMap: PageMapItem[];
  // theme config shape varies by nextra version; accept any
  themeConfig: any;
  children: ReactNode;
};

// Filters the Nextra page map to only include items for the current section.
// When in a section, extracts children directly to remove the parent wrapper.
function filterPageMapBySection(
  pageMap: PageMapItem[],
  section: "intro" | "chain" | "protocol" | "token" | null
): PageMapItem[] {
  if (!section) return pageMap;

  // For intro section, only show root-level items (index and links)
  if (section === "intro") {
    return pageMap.filter(
      (item) =>
        item.route === "/" ||
        item.route === "/links" ||
        item.name === "index" ||
        item.name === "links"
    );
  }

  const prefix = `/${section}`;

  const filterItems = (items: PageMapItem[]): PageMapItem[] => {
    const result: PageMapItem[] = [];

    for (const item of items) {
      const matches = item.route?.startsWith(prefix);

      // If this is the parent section item (e.g., route === "/chain" or "/protocol"),
      // extract its children directly instead of keeping the parent
      if (item.route === prefix || item.route === `${prefix}/`) {
        if ("children" in item && Array.isArray(item.children)) {
          result.push(...filterItems(item.children));
        }
        continue;
      }

      // For other items, check if they match or have matching children
      const children =
        "children" in item && Array.isArray(item.children)
          ? filterItems(item.children)
          : [];

      if (matches || children.length > 0) {
        result.push({
          ...item,
          ...(children.length > 0 ? { children } : {}),
        } as PageMapItem);
      }
    }

    return result;
  };

  return filterItems(pageMap);
}

export function DocsLayout({
  pageMap,
  themeConfig,
  children,
}: DocsLayoutProps) {
  const pathname = usePathname();
  // Determine section by pathname, default to intro for root
  const section = pathname?.startsWith("/protocol")
    ? "protocol"
    : pathname?.startsWith("/token")
    ? "token"
    : pathname?.startsWith("/chain")
    ? "chain"
    : pathname === "/" || pathname === "/links"
    ? "intro"
    : null;

  const filteredPageMap = useMemo(
    () => filterPageMapBySection(pageMap, section),
    [pageMap, section]
  );

  return (
    <Layout pageMap={filteredPageMap} {...themeConfig}>
      {children}
    </Layout>
  );
}

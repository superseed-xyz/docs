"use client";

import { useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarLinks() {
  const pathname = usePathname();
  const isIntro = pathname === "/" || pathname === "/links";
  const isChain = pathname?.startsWith("/chain");
  const isProtocol = pathname?.startsWith("/protocol");
  const isToken = pathname?.startsWith("/token");
  const insertedRef = useRef(false);
  const mobileInsertedRef = useRef(false);

  const renderLinks = useCallback(
    (
      container: HTMLElement,
      className: string = "navbar-links",
      isMobile: boolean = false
    ) => {
      const root = createRoot(container);
      if (isMobile) {
        // For mobile, render as separate list items to match Nextra's structure
        root.render(
          <>
            <li>
              <Link
                href="/"
                className={`navbar-link ${isIntro ? "active" : ""}`}
              >
                Introduction
              </Link>
            </li>
            <li>
              <Link
                href="/chain"
                className={`navbar-link ${isChain ? "active" : ""}`}
              >
                Chain
              </Link>
            </li>
            <li>
              <Link
                href="/protocol"
                className={`navbar-link ${isProtocol ? "active" : ""}`}
              >
                Protocol
              </Link>
            </li>
            <li>
              <Link
                href="/token"
                className={`navbar-link ${isToken ? "active" : ""}`}
              >
                Token
              </Link>
            </li>
          </>
        );
      } else {
        // For desktop navbar
        root.render(
          <div className={className}>
            <Link
              href="/"
              className={`navbar-link ${isIntro ? "active" : ""}`}
            >
              Introduction
            </Link>
            <Link
              href="/chain"
              className={`navbar-link ${isChain ? "active" : ""}`}
            >
              Chain
            </Link>
            <Link
              href="/protocol"
              className={`navbar-link ${isProtocol ? "active" : ""}`}
            >
              Protocol
            </Link>
            <Link
              href="/token"
              className={`navbar-link ${isToken ? "active" : ""}`}
            >
              Token
            </Link>
          </div>
        );
      }
    },
    [isIntro, isChain, isProtocol, isToken]
  );

  // Desktop navbar insertion
  useEffect(() => {
    if (insertedRef.current) return;

    // Find the searchbar element
    const searchbarSelectors = [
      'input[type="search"]',
      '[placeholder*="Search"]',
      ".nextra-search",
      'button[aria-label*="Search"]',
      '[data-nx="search"]',
    ];

    let searchbar: HTMLElement | null = null;

    for (const selector of searchbarSelectors) {
      searchbar = document.querySelector(selector) as HTMLElement;
      if (searchbar) break;
    }

    // If we found the searchbar, find its parent container and insert links as sibling
    if (searchbar && !insertedRef.current) {
      // Check if already exists
      const existing = document.querySelector(".navbar-links-container");
      if (existing) {
        insertedRef.current = true;
        return;
      }

      // Find the parent container
      const parent = searchbar.parentElement;
      if (!parent) return;

      // Ensure parent uses flexbox for horizontal layout
      if (getComputedStyle(parent).display !== "flex") {
        parent.style.display = "flex";
        parent.style.alignItems = "center";
      }
      // ensure consistent spacing between the links block and the searchbar
      parent.style.gap = "24px";

      // Create container
      const container = document.createElement("div");
      container.className = "navbar-links-container";

      // Insert before searchbar (as sibling, not parent)
      parent.insertBefore(container, searchbar);
      renderLinks(container, "navbar-links pr-8");

      insertedRef.current = true;
    }
  }, [pathname, isIntro, isChain, isProtocol, isToken, renderLinks]);

  // Mobile menu insertion
  useEffect(() => {
    if (mobileInsertedRef.current) return;

    const tryInsertMobileLinks = () => {
      // Find the mobile menu
      const mobileMenuSelectors = [
        "aside.nextra-mobile-nav ul",
        ".nextra-mobile-nav ul",
        "ul.nextra-menu-mobile",
        ".nextra-menu-mobile",
        'nav[aria-label="Navigation"] ul',
      ];

      let mobileMenu: HTMLElement | null = null;

      for (const selector of mobileMenuSelectors) {
        mobileMenu = document.querySelector(selector) as HTMLElement;
        if (mobileMenu) break;
      }

      // If we found the mobile menu, find "Introduction" and insert after it
      if (mobileMenu) {
        // Check if already exists
        const existing = mobileMenu.querySelector(
          ".mobile-navbar-links-container"
        );
        if (existing) {
          mobileInsertedRef.current = true;
          return true;
        }

        // Find the "Introduction" link/item - look for links with href containing "introduction"
        const menuItems = mobileMenu.querySelectorAll("li");
        let introductionItem: HTMLElement | null = null;

        for (const item of Array.from(menuItems)) {
          const link = item.querySelector("a");
          if (link) {
            const href = link.getAttribute("href") || "";
            const text = link.textContent?.trim().toLowerCase() || "";
            if (
              href.includes("introduction") ||
              text === "introduction" ||
              text.includes("introduction")
            ) {
              introductionItem = item as HTMLElement;
              break;
            }
          }
        }

        if (introductionItem) {
          // Create a wrapper container to hold both links
          const wrapper = document.createElement("div");
          wrapper.className = "mobile-navbar-links-container";
          wrapper.style.display = "contents";

          // Insert wrapper after introduction item
          introductionItem.parentElement?.insertBefore(
            wrapper,
            introductionItem.nextSibling
          );
          renderLinks(wrapper, "mobile-navbar-links", true);

          mobileInsertedRef.current = true;
          return true;
        }
      }
      return false;
    };

    // Try immediately
    if (tryInsertMobileLinks()) return;

    // Retry with a small delay in case menu isn't ready yet
    const timeout = setTimeout(() => {
      tryInsertMobileLinks();
    }, 100);

    // Also observe DOM changes in case menu loads dynamically
    const observer = new MutationObserver(() => {
      if (!mobileInsertedRef.current) {
        if (tryInsertMobileLinks()) {
          observer.disconnect();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [pathname, isIntro, isChain, isProtocol, isToken, renderLinks]);

  return null;
}

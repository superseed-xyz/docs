import nextra from "nextra";

const withNextra = nextra({});

export default withNextra({
  // The Superseed chain is wound down; old links land on the docs home.
  async redirects() {
    return [
      { source: "/chain", destination: "/", permanent: false },
      { source: "/chain/:path*", destination: "/", permanent: false },
    ];
  },
});

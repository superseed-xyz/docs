import type { Metadata } from "next";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents } from "../../mdx-components";

type Params = {
  mdxPath?: string[];
};

type PageProps = {
  params: Promise<Params>;
};

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { mdxPath = [] } = await props.params;
  const { metadata } = await importPage(mdxPath);
  return (metadata ?? {}) as Metadata;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const mdxPath = resolvedParams.mdxPath ?? [];
  const result = await importPage(mdxPath);
  const { default: MDXContent, toc, metadata, sourceCode } = result;
  const { wrapper: Wrapper } = useMDXComponents({});

  if (!Wrapper) {
    return <MDXContent params={resolvedParams} />;
  }

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent params={resolvedParams} />
    </Wrapper>
  );
}

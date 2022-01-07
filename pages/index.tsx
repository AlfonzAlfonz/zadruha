import { Container } from "components/Container";
import { HeroPost } from "components/HeroPost";
import { Intro } from "components/Intro";
import { Layout } from "components/Layout";
import { MoreStories } from "components/MoreStories";
import { getAllPostsForHome } from "lib/api";
import { CMS_NAME } from "lib/constants";
import { Edges, IPost, Nod } from "lib/types";
import Head from "next/head";
import { FC } from "react";

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts: allPosts, preview }
  };
};

const Index: FC<{ allPosts: Edges<Nod<IPost>>; preview: boolean }> = ({ allPosts: { edges }, preview }) => {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.featuredImage?.node}
              date={heroPost.date}
              author={heroPost.author?.node}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

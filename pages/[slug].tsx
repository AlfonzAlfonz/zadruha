import { x } from "@xstyled/emotion";
import { Container } from "anolis-ui";
import { Layout } from "components/Layout";
import { getProps, StaticPage } from "lib/getProps";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

export const getStaticProps = getProps(async () => {
  return { props: {} };
});

export const getStaticPaths: GetStaticPaths = async () => {
  // const allPosts = await getAllPostsWithSlug();

  return {
    // paths: allPosts.edges.map(({ node }) => `/prispevek/${node.slug}`) || [],
    paths: [],
    fallback: true
  };
};

interface Props {
}

const Post: StaticPage<Props> = ({ preview, menu }) => {
  const router = useRouter();

  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />;
  // }

  return (
    <Layout preview={preview} menu={menu}>
      <x.div bg="black" minH={`${90 * 4}px`} mt={-20}>

      </x.div>
      {/* <Header /> */}
      <Container bg="white" minH="100vh" mt="-120px">

      </Container>
    </Layout>
  );
};

export default Post;

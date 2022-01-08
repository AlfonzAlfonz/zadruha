import { x } from "@xstyled/emotion";
import { Container } from "anolis-ui";
import { Layout } from "components/Layout";
import { backend } from "lib/api";
import { buildMenu, FineMenuItem } from "lib/buildMenu";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
  // const data = await getPostAndMorePosts(only(params!.slug)!, preview, previewData);
  const menu = buildMenu(await backend.GetMenu());

  return {
    props: {
      preview,
      menu
      // post: data.post,
      // posts: data.posts
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const allPosts = await getAllPostsWithSlug();

  return {
    // paths: allPosts.edges.map(({ node }) => `/prispevek/${node.slug}`) || [],
    paths: [],
    fallback: true
  };
};

interface Props {
  preview: boolean;
  menu: FineMenuItem[];
}

const Post: FC<Props> = ({ preview, menu }) => {
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

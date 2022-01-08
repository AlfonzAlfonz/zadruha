import { x } from "@xstyled/emotion";
import { Container } from "anolis-ui";
import { DisplayDate } from "components/Date";
import { Layout } from "components/Layout";
import { MoreStories } from "components/MoreStories";
import { PostBody } from "components/PostBody";
import { PostTitle } from "components/PostTitle";
import { SectionSeparator } from "components/SectionSeparator";
import { Tags } from "components/Tags";
import { backend, getAllPostsWithSlug, getPostAndMorePosts } from "lib/api";
import { buildMenu, FineMenuItem } from "lib/buildMenu";
import { CMS_NAME } from "lib/constants";
import { Edges, IFullPost, IPost, Nod } from "lib/types";
import { only } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import { Avatar } from "components/Avatar";

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
  const data = await getPostAndMorePosts(only(params!.slug)!, preview, previewData);
  const menu = buildMenu(await backend.GetMenu());

  return {
    props: {
      preview,
      menu,
      post: data.post,
      posts: data.posts
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/clanek/${node.slug}`) || [],
    fallback: true
  };
};

interface Props {
  post: IFullPost;
  posts: Edges<Nod<IPost>>;
  preview: boolean;
  menu: FineMenuItem[];
}

const Post: FC<Props> = ({ post, posts, preview, menu }) => {
  const router = useRouter();
  const morePosts = posts?.edges;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview} menu={menu}>
      <x.div bg="black" minH={`${90 * 4}px`} mt={-20}>

      </x.div>
      {/* <Header /> */}
      <Container bg="white" minH="100vh" mt="-120px">
        {router.isFallback
          ? <PostTitle>Loading…</PostTitle>
          : (
            <>
              <x.article pt={4} px={2}>
                <Head>
                  <title>
                    {post.title} | Next.js Blog Example with {CMS_NAME}
                  </title>
                  <meta
                    property="og:image"
                    content={post.featuredImage?.node?.sourceUrl!}
                  />
                </Head>
                <PostTitle>{post.title}</PostTitle>
                <x.div fontSize="sm" py={2} display="flex" spaceX={2}>
                  <DisplayDate dateString={post.date} /> <div>|</div> {post.author && <Avatar author={post.author.node} />}
                </x.div>
                <x.div fontSize="sm" py={2} display="flex" spaceX={2}>
                  {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                </x.div>

                <PostBody content={post.content} />
              </x.article>

              <SectionSeparator />
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </>
          )}
      </Container>
    </Layout>
  );
};

export default Post;

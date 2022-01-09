import { x } from "@xstyled/emotion";
import { Container } from "anolis-ui";
import { Avatar } from "components/Avatar";
import { DisplayDate } from "components/Date";
import { Layout } from "components/Layout";
import { MoreStories } from "components/MoreStories";
import { PostBody } from "components/PostBody";
import { PostTitle } from "components/PostTitle";
import { SectionSeparator } from "components/SectionSeparator";
import { Tags } from "components/Tags";
import { getAllPostsWithSlug, getPostAndMorePosts } from "lib/api";
import { CMS_NAME } from "lib/constants";
import { getProps, StaticPage } from "lib/getProps";
import { Edges, IFullPost, IPost, Nod } from "lib/types";
import { only } from "lib/utils";
import { GetStaticPaths } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";

export const getStaticProps = getProps(async ({ params, preview, previewData }) => {
  const data = await getPostAndMorePosts(only(params!.slug)!, preview, previewData);

  return {
    props: {
      post: data.post,
      posts: data.posts
    }
  };
});

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
}

const Post: StaticPage<Props> = ({ post, posts, preview, menu }) => {
  const router = useRouter();
  const morePosts = posts?.edges;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview} menu={menu}>
      <x.div
        bg="black"
        background="url('/bg.jpg')"
        backgroundSize="100%"
        backgroundPosition="center 10%"
        backgroundAttachment="fixed"
        minH={`${90 * 4}px`}
        boxShadow="0px 0px 10000px 0px rgba(0,0,0,0.6) inset"
        mt={-20}
      >

      </x.div>
      {/* <Header /> */}
      <Container
        bg="white"
        mt="-120px"
        display="flex"
        justifyContent="center"
        position="relative"
        zIndex={2}
        boxShadow="md"
      >
        {router.isFallback
          ? (
            <x.article pt={16} px={2} pb={`${40 * 4}px`}>
              <PostTitle>Loading…</PostTitle>
            </x.article>
          )
          : (
            <>
              <x.article pt={16} px={2} pb={`${40 * 4}px`}>
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
                <x.div fontSize="sm" py={2} display="flex" spaceX={2} maxW="50rem" m="auto">
                  <DisplayDate dateString={post.date} />  {post.author && <><div>|</div><Avatar author={post.author.node} /></>}
                  {post.tags.edges.length > 0 && <><div>|</div><Tags tags={post.tags} /></>}
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

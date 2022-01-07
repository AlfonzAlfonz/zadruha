import { Container } from "components/Container";
import { Header } from "components/Header";
import { Layout } from "components/Layout";
import { MoreStories } from "components/MoreStories";
import { PostBody } from "components/PostBody";
import { PostHeader } from "components/PostHeader";
import { PostTitle } from "components/PostTitle";
import { SectionSeparator } from "components/SectionSeparator";
import { Tags } from "components/Tags";
import { getAllPostsWithSlug, getPostAndMorePosts } from "lib/api";
import { CMS_NAME } from "lib/constants";
import { Edges, IFullPost, IPost, Nod } from "lib/types";
import { only } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
  const data = await getPostAndMorePosts(only(params!.slug)!, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: true
  };
};

interface Props {
  post: IFullPost;
  posts: Edges<Nod<IPost>>;
  preview: boolean;
}

const Post: FC<Props> = ({ post, posts, preview }) => {
  const router = useRouter();
  const morePosts = posts?.edges;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback
          ? <PostTitle>Loading…</PostTitle>
          : (
            <>
              <article>
                <Head>
                  <title>
                    {post.title} | Next.js Blog Example with {CMS_NAME}
                  </title>
                  <meta
                    property="og:image"
                    content={post.featuredImage?.node?.sourceUrl}
                  />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={post.featuredImage?.node}
                  date={post.date}
                  author={post.author?.node}
                  categories={post.categories}
                />
                <PostBody content={post.content} />
                <footer>
                  {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                </footer>
              </article>

              <SectionSeparator />
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </>
          )}
      </Container>
    </Layout>
  );
};

export default Post;

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
        {/* {router.isFallback
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
                    content={post.featuredImage?.node?.sourceUrl}
                  />
                </Head>
                <PostTitle>{post.title}</PostTitle>
                <x.div fontSize="sm" py={2} display="flex" spaceX={2}>
                  <Date dateString={post.date} /> <div>|</div> {post.author && <Avatar author={post.author.node} />}
                </x.div>
                <x.div fontSize="sm" py={2} display="flex" spaceX={2}>
                  {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                </x.div>

                <PostBody content={post.content} />
              </x.article>

              <SectionSeparator />
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </>
          )} */}
      </Container>
    </Layout>
  );
};

export default Post;

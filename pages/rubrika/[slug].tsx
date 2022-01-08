import { x } from "@xstyled/emotion";
import { Container } from "anolis-ui";
import { Layout } from "components/Layout";
import { PostPreview } from "components/PostPreview";
import { Post } from "generated/graphql";
import { backend } from "lib/api";
import { getProps, StaticPage } from "lib/getProps";
import { Awaited, only } from "lib/utils";
import { GetStaticPaths } from "next";
import { FC, Fragment } from "react";

export const getStaticProps = getProps(async ({ params }) => {
  const posts = await backend.GetCategoryWithPosts({ slug: only(params!.slug!) });

  return {
    props: {
      posts
    }
  };
});

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await backend.GetCategorySlugs();

  return {
    paths: categories.categories?.edges?.map(e => `/rubrika/${e?.node?.slug!}`) ?? [],
    fallback: true
  };
};

interface Props {
  posts: Awaited<ReturnType<typeof backend.GetCategoryWithPosts>>;
}

const Category: StaticPage<Props> = ({ posts, preview, menu }) => {
  const category = posts?.categories?.edges?.[0];

  return (
    <Layout preview={preview} menu={menu}>

      <Container>
        <x.div maxW="700px !important" margin="auto" mt={10}>
          <x.h1 mt="2" mb="4" fontSize="4xl">Nejnovější články</x.h1>

          {category?.node?.contentNodes?.edges?.map((p) => (
            <Fragment key={p?.node?.slug}>
              {isPost(p?.node) && (
                <PostPreview
                  title={p?.node.title}
                  coverImage={p?.node.featuredImage?.node}
                  date={p?.node.date}
                  author={p?.node.author?.node}
                  slug={p?.node.slug}
                  excerpt={p?.node.excerpt}
                />
              )}
            </Fragment>
          ))}
        </x.div>
      </Container>
    </Layout>
  );
};

export default Category;

const isPost = (p: any): p is Post => p?.__typename === "Post";

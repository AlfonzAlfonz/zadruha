import { x } from "@xstyled/emotion";
import { Container } from "anolis-ui";
import { Layout } from "components/Layout";
import { PostPreview } from "components/PostPreview";
import { Post } from "generated/graphql";
import { backend } from "lib/api";
import { buildMenu, FineMenuItem } from "lib/buildMenu";
import { Awaited, only } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC, Fragment } from "react";

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
  const posts = await backend.GetCategoryWithPosts({ slug: only(params!.slug!) });
  const menu = buildMenu(await backend.GetMenu());

  return {
    props: {
      preview,
      menu,
      posts
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await backend.GetCategorySlugs();
  console.log(categories);
  return {
    paths: categories.categories?.edges?.map(e => `/rubrika/${e?.node?.slug!}`) ?? [],
    fallback: true
  };
};

interface Props {
  posts: Awaited<ReturnType<typeof backend.GetCategoryWithPosts>>;
  preview: boolean;
  menu: FineMenuItem[];
}

const Category: FC<Props> = ({ posts, preview, menu }) => {
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

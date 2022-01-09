import { x } from "@xstyled/emotion";
import { Button, Container } from "anolis-ui";
import { Layout } from "components/Layout";
import { pageLink } from "components/Layout/Nav";
import { PostPreview } from "components/PostPreview";
import { getAllPostsForHome } from "lib/api";
import { getProps, StaticPage } from "lib/getProps";
import { Edges, IPost, Nod } from "lib/types";
import Head from "next/head";
import Link from "next/link";

export const getStaticProps = getProps(async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts }
  };
});

const Index: StaticPage<{ allPosts: Edges<Nod<IPost>> }> = ({ allPosts: { edges }, preview, menu }) => {
  return (
    <>
      <Layout
        preview={preview}
        _header={{ bg: "transparent", pt: 2, boxShadow: "none" }}
        _logo={{
          color: { _: "white", hover: "white" },
          textShadow: "0 0 10px black, 0 0 10px black"
        }}
        _container={{ pt: 0 }}
        subtitle
      >
        <Head>
          <title>Historie českého anarchismu (1880 – 1939) – Anarchistická historie</title>
        </Head>

        <x.div
          h="60vh"
          display="flex"
          alignItems="flex-end"
          position="relative"
          justifyContent="center"
        >
          <x.div
            background="url('/bg.jpg')"
            backgroundSize={{ _: "cover", md: "100%" }}
            backgroundPosition="center"
            position="absolute"
            style={{ inset: 0 }}
            boxShadow="0 0 10000px 0 rgba(0,0,0,0.6) inset"
          />
          <Container position="absolute" bottom="20%">
            <x.nav
              spaceX={4}
              display="flex"
              justifyContent="center"
              overflow="hidden"
              flexWrap="wrap"
              mt={-4}
            >
              {menu.map(itm =>
                itm.type === null
                  ? <Button as="a" fontSize="lg" mt={4} href={itm.url!} target="_blank">{itm.label}</Button>
                  : (
                    <Link key={itm.id} href={pageLink(itm.type!, itm.slug!)} passHref>
                      <Button as="a" mt={4} fontSize="lg">{itm.label}</Button>
                    </Link>
                  ))}
            </x.nav>
          </Container>
        </x.div>

        <Container>
          <x.div maxW="700px" margin="auto" mt={10} mb={20}>
            <x.h1 mt="2" mb="4" fontSize="4xl">Nejnovější články</x.h1>

            {edges.map(({ node }) => (
              <PostPreview
                key={node.slug}
                title={node.title}
                coverImage={node.featuredImage?.node}
                date={node.date}
                author={node.author?.node}
                slug={node.slug}
                excerpt={node.excerpt}
              />
            ))}
          </x.div>
        </Container>
      </Layout>
    </>
  );
};

export default Index;

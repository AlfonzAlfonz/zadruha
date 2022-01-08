import { Container } from "anolis-ui";
import { Layout } from "components/Layout";
import { backend } from "lib/api";
import { buildMenu, FineMenuItem } from "lib/buildMenu";
import { FC } from "react";

export const getStaticProps = async ({ preview = false }) => {
  const menu = buildMenu(await backend.GetMenu());
  return {
    props: { menu: menu, preview }
  };
};

const Error404: FC<{ menu: FineMenuItem[]; preview: boolean }> = ({ menu, preview }) => {
  return (
    <Layout menu={menu} preview={preview}>
      <Container>
        <h1>Stránka nebyla nalezena</h1>
        <p>Error 404</p>
      </Container>
    </Layout>
  );
};

export default Error404;

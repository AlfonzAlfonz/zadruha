import { Container } from "anolis-ui";
import { Layout } from "components/Layout";
import { getProps, StaticPage } from "lib/getProps";
import { FC } from "react";

export const getStaticProps = getProps(async () => {
  return {
    props: {}
  };
});

const Error404: StaticPage<{}> = ({ menu, preview }) => {
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

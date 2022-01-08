import { GetStaticProps } from "next";
import { FC } from "react";

import { backend } from "./api";
import { buildMenu, FineMenuItem } from "./buildMenu";

export const getProps = (gsp: GetStaticProps): GetStaticProps =>
  async (ctx) => {
    let [menu, result] = await Promise.all([backend.GetMenu(), gsp(ctx)]);

    result = "props" in result
      ? { props: { ...result.props, menu: buildMenu(menu), preview: ctx.preview ?? false }, revalidate: 10 }
      : result;

    return result;
  };

export type StaticPage<T extends object> = FC<T & { menu: FineMenuItem[]; preview: boolean }>;

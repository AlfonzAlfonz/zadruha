import { backend } from "./api";
import { Awaited } from "./utils";
import { MenuItem } from "../generated/graphql";

export interface FineMenuItem {
  id: string;
  label: string;
  type: "Post" | "Category" | "Page" | null;
  order: number;

  slug: string | null;
  url: string | null;

  children: FineMenuItem[];
}

export const buildMenu = (res: Awaited<ReturnType<typeof backend.GetMenu>>) => {
  const root: FineMenuItem[] = [];
  const map = new Map<string, FineMenuItem[]>();

  const itms = res.menus?.edges?.[0]?.node?.menuItems?.edges;
  if (!itms) return [];

  for (const itm of itms) {
    const key = itm?.node?.parentId!;
    if (key === null) {
      root.push(fineMenuItem(itm!.node as MenuItem));
    } else {
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(fineMenuItem(itm!.node as MenuItem));
    }
  }

  return appendItems(root, map);
};

const appendItems = (root: FineMenuItem[], map: Map<string, FineMenuItem[]>): FineMenuItem[] =>
  root.map(itm => ({
    ...itm,
    children: map.has(itm.id)
      ? appendItems(map.get(itm.id)!, map)
      : []
  }));

const fineMenuItem = (itm: MenuItem): FineMenuItem => ({
  id: itm.id,
  label: itm.label!,
  order: itm.order!,
  slug: itm.connectedNode ? (itm.connectedNode.node as any).slug : null,
  url: itm.connectedNode ? null : itm.url!,
  type: itm.connectedNode ? (itm.connectedNode.node as any).__typename : null,
  children: []
});

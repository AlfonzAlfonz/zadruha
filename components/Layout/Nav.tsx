import { cloneElement, FC } from "react";
import { FineMenuItem } from "lib/buildMenu";
import styled, { x } from "@xstyled/emotion";
import Link from "next/link";
import { Button } from "anolis-ui";

interface Props {
  menu: FineMenuItem[];
}

export const Nav: FC<Props> = ({ menu }) => {
  return (
    <x.nav
      display={{ _: "none", md: "flex" }}
      alignItems="center"
      ml={8}
      flexWrap="wrap"
      mb={-0}
      zIndex={11}
    >
      {menu?.map((itm, i) => <NavItem key={i} itm={itm} />)}
    </x.nav>
  );
};

export const BurgerNav: FC<Props> = ({ menu }) => {
  return (
    <BurgerNavStyle display={{ _: "flex", md: "none" }}>
      <Button position="absolute" right={4 * 8} top={0} bottom={0} zIndex={12}>Menu</Button>
      <x.nav
        display="none"
        position="absolute"
        right={0}
        top="100%"
        bg="white"
        boxShadow="lg"
        flexDirection="column"
        w="100%"
        zIndex={9}
      >
        {menu?.map((itm, i) => <NavItem key={i} itm={itm} />)}
      </x.nav>
    </BurgerNavStyle>
  );
};

const BurgerNavStyle = styled.divBox`
  &:focus-within nav {
    display: flex;
  }
`;

const NavItem: FC<{ itm: FineMenuItem }> = ({ itm }) => {
  const link = (
    <x.a
      color={{ _: "zadruha-900", hover: "zadruha-500" }}
      p={4}
      textDecoration="none"
      fontSize="lg"
      bg={{ hover: "rgba(0,0,0,0.05)" }}
      transition
      mb={0}
    >
      {itm.label}
    </x.a>
  );

  return (
    itm.type === null
      ? cloneElement(link, { href: itm.url })
      : (
        <Link href={pageLink(itm.type, itm.slug!)} passHref>
          {link}
        </Link>
      )
  );
};

export const pageLink = (type: string, slug: string) => ({
  Page: `/${slug}`,
  Category: `/rubrika/${slug}`,
  Post: `/clanek/${slug}`
})[type]!;

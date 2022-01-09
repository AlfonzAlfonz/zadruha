import { SystemProps, x } from "@xstyled/emotion";
import { Meta } from "components/Meta";
import { FineMenuItem } from "lib/buildMenu";
import Link from "next/link";
import { cloneElement, ComponentProps, FC } from "react";

import { Alert } from "./Alert";

interface Props {
  preview: boolean;
  menu?: FineMenuItem[];
  _header?: SystemProps;
  _logo?: SystemProps;
  subtitle?: boolean;
  _container?: SystemProps;
}

export const Layout: FC<Props> = ({
  menu,
  preview,
  children,
  _header,
  _container,
  _logo,
  subtitle,
  ...props
}) => {
  return (
    <x.div fontFamily="'Lora', serif;" {...props}>
      <Meta />

      <Alert preview={preview} />
      <x.header
        display="flex"
        px={8}
        position="fixed"
        w="100vw"
        bg="white"
        zIndex={10}
        boxShadow="lg"
        {..._header}
      >
        <Link href="/" passHref>
          <x.a
            fontSize="3xl"
            textDecoration="none"
            color="zadruha-900"
            p={2}
            fontWeight={600}
            letterSpacing={1}
            {..._logo}
          >
            Zádruha
            {subtitle && (
              <>
                <br />
                <x.span fontSize="xs" display="block">historie českého anarchistického hnutí</x.span>
              </>
            )}
          </x.a>
        </Link>
        {menu && (
          <x.nav display="flex" alignItems="center" spaceX={8} ml={8}>
            {menu?.map((itm, i) => <MenuItem key={i} itm={itm} />)}
          </x.nav>
        )}
      </x.header>
      <x.div display="flex" flexDirection="column" bg="gray-200" minHeight="calc(100vh - 40px)" pt="120px" {..._container}>
        {children}
      </x.div>

      <x.footer
        bg="zadruha-900"
        color="white"
        h="40px"
        p={3}
        textAlign="center"
        position="relative"
        fontSize="sm"
      >
        Spolek zádruha - {new Date().getFullYear()}
        <x.span position="absolute" right={16} color="gray-500" fontSize="xs">coding by Denis Homolík</x.span>
      </x.footer>
    </x.div>
  );
};

const MenuItem: FC<{ itm: FineMenuItem }> = ({ itm }) => {
  const link = (
    <x.a
      color="zadruha-900"
      py={4}
      textDecoration="none"
      fontSize="lg"
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

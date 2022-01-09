import { SystemProps, x } from "@xstyled/emotion";
import { Meta } from "components/Layout/Meta";
import { FineMenuItem } from "lib/buildMenu";
import Link from "next/link";
import { FC } from "react";

import { Alert } from "../Alert";
import { BurgerNav, Nav } from "./Nav";

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
        alignItems="center"
        w="100vw"
        bg="white"
        zIndex={10}
        {..._header}
      >
        <x.div
          position="absolute"
          style={{ inset: 0 }}
          boxShadow="lg"
          zIndex={11}
        />
        <Link href="/" passHref>
          <x.a
            fontSize="3xl"
            textDecoration="none"
            color="zadruha-900"
            p={2}
            fontWeight={600}
            letterSpacing={1}
            {..._logo}
            zIndex={12}
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
        {menu && <Nav menu={menu} />}
        {menu && <BurgerNav menu={menu} />}
      </x.header>
      <x.div display="flex" flexDirection="column" bg="gray-200" minHeight="calc(100vh - 40px)" pt="120px" {..._container}>
        {children}
      </x.div>

      <x.footer
        bg="zadruha-900"
        color="white"
        minH="40px"
        p={3}
        textAlign="center"
        position="relative"
        fontSize="sm"
        display="flex"
        flexDirection="column"
      >
        <span>Spolek zádruha - {new Date().getFullYear()}</span>
        <x.span
          position={{ _: "static", sm: "absolute" }}
          right={16}
          color="gray-500"
          fontSize="xs"
          mt={{ _: 4, sm: 0 }}
        >
          website by Denis Homolík
        </x.span>
      </x.footer>
    </x.div>
  );
};

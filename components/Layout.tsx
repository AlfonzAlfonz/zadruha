import { Alert } from "./Alert";
import { Footer } from "components/Footer";
import { Meta } from "components/Meta";
import { FC } from "react";

interface Props {
  preview: boolean;
}

export const Layout: FC<Props> = ({ preview, children }) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

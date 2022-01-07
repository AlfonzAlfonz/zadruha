import { FC } from "react";

export const Container: FC = ({ children }) => {
  return <div className="container mx-auto px-5">{children}</div>;
};

import { x } from "@xstyled/emotion";
import { FC } from "react";

export const PostTitle: FC<{ children: string }> = ({ children }) => {
  return (
    <x.h1
      maxW="50rem"
      m="auto"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};

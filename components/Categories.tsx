import { IFullPost } from "lib/types";
import { FC } from "react";

interface Props {
  categories: IFullPost["categories"];
}

export const Categories: FC<Props> = ({ categories }) => {
  return (
    <span className="ml-1">
      under
      {Array.isArray(categories.edges)
        ? categories.edges.map((category, index) => (
          <span key={index} className="ml-1">
            {category.node.name}
          </span>
        ))
        : <span className="ml-1">{categories.edges.node.name}</span>}
    </span>
  );
};

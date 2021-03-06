import { IAuthor, ICoverImage, Nod } from "lib/types";
import { FC } from "react";

import { PostPreview } from "./PostPreview";

interface Props {
  posts: { node: IPost }[];
}

interface IPost {
  slug: string;
  title: string;
  featuredImage?: Nod<ICoverImage>;
  date: string;
  author?: Nod<IAuthor>;
  excerpt: string;
}

export const MoreStories: FC<Props> = ({ posts }) => {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {posts.map(({ node }) => (
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage?.node}
            date={node.date}
            author={node.author?.node}
            slug={node.slug}
            excerpt={node.excerpt}
          />
        ))}
      </div>
    </section>
  );
};

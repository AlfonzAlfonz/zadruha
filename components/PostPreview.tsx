import { Avatar } from "./Avatar";
import { Date } from "./Date";
import { CoverImage } from "./CoverImage";
import Link from "next/link";
import { FC } from "react";
import { IAuthor, ICoverImage } from "lib/types";

interface Props {
  title: string;
  coverImage?: ICoverImage;
  date: string;
  excerpt: string;
  author?: IAuthor;
  slug: string;
}

export const PostPreview: FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug
}) => {
  return (
    <div>
      <div className="mb-5">
        {coverImage &&
          <CoverImage title={title} coverImage={coverImage} slug={slug} />}
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`}>
          <a
            className="hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          >
          </a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <div
        className="text-lg leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      {author && <Avatar author={author} />}
    </div>
  );
};

import cn from "classnames";
import { ICoverImage } from "lib/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  title: string;
  coverImage: ICoverImage;
  slug?: string;
}

export const CoverImage: FC<Props> = ({ title, coverImage, slug }) => {
  const image = (
    <Image
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      src={coverImage.sourceUrl}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug
      })}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      )
        : image}
    </div>
  );
};

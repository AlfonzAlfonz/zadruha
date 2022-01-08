import cn from "classnames";
import { ICoverImage } from "lib/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  title?: string | null;
  coverImage?: ICoverImage | null;
  slug?: string | null;
}

export const CoverImage: FC<Props> = ({ title, coverImage, slug }) => {
  const image =
    coverImage?.sourceUrl && (
      <Image
        width={2000}
        height={1000}
        alt={title ? `Cover Image for ${title}` : undefined}
        src={coverImage.sourceUrl}
        className={cn("shadow-small", {
          "hover:shadow-medium transition-shadow duration-200": slug
        })}
      />
    )
  ;
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title!}>{image}</a>
        </Link>
      )
        : image}
    </div>
  );
};

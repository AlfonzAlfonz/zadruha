import { Avatar } from "./Avatar";
import { DisplayDate } from "./Date";
import { CoverImage } from "./CoverImage";
import Link from "next/link";
import { FC } from "react";
import { IAuthor, ICoverImage } from "lib/types";
import { x } from "@xstyled/emotion";

interface Props {
  title?: string | null;
  coverImage?: ICoverImage | null;
  date?: string | null;
  excerpt?: string | null;
  author?: IAuthor | null;
  slug?: string | null;
}

export const PostPreview: FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug
}) => {
  if (!slug) return null;
  return (
    <x.div bg="white" p={5} mx={-5}>
      <div className="mb-5">
        {coverImage &&
          <CoverImage title={title} coverImage={coverImage} slug={slug} />}
      </div>
      <x.h3 fontSize="3xl">
        <Link href={`/prispevek/${slug}`}>
          {title && (
            <a
              className="hover:underline"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        </Link>
      </x.h3>
      <x.div fontSize="sm" py={2} display="flex" spaceX={2}>
        <DisplayDate dateString={date!} /> <div>|</div> {author && <Avatar author={author} />}
      </x.div>
      {excerpt && (
        <div
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      )}

    </x.div>
  );
};

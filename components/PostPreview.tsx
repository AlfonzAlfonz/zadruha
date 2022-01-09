import { Avatar } from "./Avatar";
import { DisplayDate } from "./Date";
import { CoverImage } from "./CoverImage";
import Link from "next/link";
import { FC, useMemo } from "react";
import { IAuthor, ICoverImage } from "lib/types";
import styled, { x } from "@xstyled/emotion";

interface Props {
  title?: string | null;
  coverImage?: ICoverImage | null;
  date?: string | null;
  excerpt?: string | null;
  author?: IAuthor | null;
  slug?: string | null;
}

const excerptRegex = /<a href="\S+" class="more-link">(.+)<\/a>/;

export const PostPreview: FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug
}) => {
  // eslint-disable-next-line @typescript-eslint/no-extra-parens
  // const exc = useMemo(() => (excerpt && excerptRegex.exec(excerpt)) || [null, null][1], [excerpt]);

  if (!slug) return null;

  return (
    <x.div bg="white" p={5} mx={-5} boxShadow="md">
      <div className="mb-5">
        {coverImage &&
          <CoverImage title={title} coverImage={coverImage} slug={slug} />}
      </div>
      <x.h3 fontSize="3xl">
        <Link href={`/clanek/${slug}`}>
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
        <LinkStyle
          py={2}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      )}

      <Link href={`/clanek/${slug}`} passHref><x.a mt={3}>Celý článek...</x.a></Link>

    </x.div>
  );
};

const LinkStyle = styled.divBox`
  .link-more {
    display: none;
  }
`;

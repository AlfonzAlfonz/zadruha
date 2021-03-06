import { Avatar } from "./Avatar";
import { DisplayDate } from "./Date";
import { CoverImage } from "./CoverImage";
import Link from "next/link";
import { FC } from "react";
import { IAuthor, ICoverImage } from "lib/types";

interface Props {
  title: string;
  coverImage?: ICoverImage;
  date: string;
  excerpt: string;
  author: IAuthor;
  slug: string;
}

export const HeroPost: FC<Props> = ({ title, coverImage, date, excerpt, author, slug }) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        {coverImage &&
          <CoverImage title={title} coverImage={coverImage} slug={slug} />}
      </div>
      <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`}>
              <a
                className="hover:underline"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DisplayDate dateString={date} />
          </div>
        </div>
        <div>
          <div
            className="text-lg leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <Avatar author={author} />
        </div>
      </div>
    </section>
  );
};

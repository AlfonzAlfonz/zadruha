import { IAuthor, ICoverImage, IFullPost } from "lib/types";
import { FC } from "react";

import { Avatar } from "./Avatar";
import { Categories } from "./Categories";
import { CoverImage } from "./CoverImage";
import { Date } from "./Date";
import { PostTitle } from "./PostTitle";

interface Props {
  title: string;
  coverImage?: ICoverImage;
  date: string;
  author: IAuthor;
  categories: IFullPost["categories"];
}

export const PostHeader: FC<Props> = ({
  title,
  coverImage,
  date,
  author,
  categories
}) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar author={author} />
      </div>
      {coverImage && (
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={title} coverImage={coverImage} />
        </div>
      )}
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar author={author} />
        </div>
        <div className="mb-6 text-lg">
          Posted <Date dateString={date} />
          <Categories categories={categories} />
        </div>
      </div>
    </>
  );
};

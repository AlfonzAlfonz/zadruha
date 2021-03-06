import { x } from "@xstyled/emotion";
import { IAuthor } from "lib/types";
import Image from "next/image";
import { FC } from "react";

export const Avatar: FC<{ author?: IAuthor }> = ({ author }) => {
  if (!author) return null;
  const name = author.firstName && author.lastName
    ? `${author.firstName} ${author.lastName}`
    : author.name;

  return (
    <div className="flex items-center">
      <x.div position="relative">
        {author.avatar?.url && (
          <Image
            src={author.avatar.url}
            layout="fill"
            className="rounded-full"
            alt={name!}
          />
        )}
      </x.div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

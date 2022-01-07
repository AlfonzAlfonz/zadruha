import { x } from "@xstyled/emotion";
import { IAuthor } from "lib/api";
import Image from "next/image";
import { FC } from "react";

export const Avatar: FC<{ author: IAuthor }> = ({ author }) => {
  const name = author.firstName && author.lastName
    ? `${author.firstName} ${author.lastName}`
    : author.name;

  return (
    <div className="flex items-center">
      <x.div position="relative">
        <Image
          src={author.avatar.url}
          layout="fill"
          className="rounded-full"
          alt={name}
        />
      </x.div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export interface Nod<T> {
  node: T;
}

export interface Edges<T> {
  edges: T[];
}

export interface IPost {
  title: string;
  featuredImage?: Nod<ICoverImage>;
  date: string;
  author: Nod<IAuthor>;
  excerpt: string;
  slug: string;
}

export interface IFullPost extends IPost {
  databaseId: string | number;
  status: string;
  revisions: any;
  content: string;

  tags: Edges<Nod<ITag>>;

  categories: {
    edges: Nod<ICategory>[] | Nod<ICategory>;
  };
}

export interface IAuthor {
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  avatar?: {
    url?: string | null;
  } | null;
}

export interface ICategory {
  name: string;
}

export interface ICoverImage {
  sourceUrl?: string | null;
}

export interface ITag {
  name: string;
}

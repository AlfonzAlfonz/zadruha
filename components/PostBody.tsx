import styled from "@xstyled/emotion";
import { FC } from "react";

interface Props {
  content: string;
}

export const PostBody: FC<Props> = ({ content }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <BodyStyle
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export const BodyStyle = styled.div`
.content {
  @apply text-lg leading-relaxed;
}

.content p,
.content ul,
.content ol,
.content blockquote {
  @apply my-6;
}

.content a {
  @apply underline;
}

.content ul,
.content ol {
  @apply pl-4;
}

.content ul {
  @apply list-disc;
}

.content ol {
  @apply list-decimal;
}

.content ul > li > ul,
.content ol > li > ol {
  @apply my-0 ml-4;
}

.content ul > li > ul {
  list-style: circle;
}

.content h2 {
  @apply text-3xl mt-12 mb-4 leading-snug;
}

.content h3 {
  @apply text-2xl mt-8 mb-4 leading-snug;
}

.content h4 {
  @apply text-xl mt-6 mb-4 leading-snug;
}

.content pre {
  @apply whitespace-pre overflow-x-auto p-4 text-sm leading-tight border border-gray-400 bg-gray-100;
}

.content code {
  @apply text-sm;
}

.content figcaption {
  @apply text-center text-sm;
}

.content blockquote {
  @apply border-l-4 border-gray-500 bg-gray-200 italic ml-0 py-4 px-6;
}

.content blockquote p {
  @apply mt-0;
}

.content blockquote cite {
  @apply not-italic;
}

.content audio {
  @apply w-full;
}

`;
import styled from "@xstyled/emotion";
import { FC, useEffect, useRef } from "react";

interface Props {
  content: string;
}

export const PostBody: FC<Props> = ({ content }) => {
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    ref.current?.querySelectorAll(
      "figure.wp-block-gallery img, .wp-block-cover img, .wp-block-media-text .wp-block-media-text__media img, .wp-block-image img"
    ).forEach(el => {
      el.removeAttribute("sizes");
      el.removeAttribute("width");
      el.removeAttribute("height");
    });
  }, []);

  return (
    <BodyStyle
      ref={ref}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export const BodyStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p, blockquote, h1, h2, h3, h4, h5, h6, ul, ol {
    max-width: 50rem;
    width: 100%;
  }

  p {
    padding-top: 6;
    padding-bottom: 6;
  }

  h1, h2, h3, h4, h5, h6 {

  }

  & > blockquote {
    border-left: 5px solid;
    border-color: zadruha-500;

    padding-top: 4;
    padding-left: 6;
    padding-bottom: 6;
    
    p {
      padding: 0 0 4 0;
    }
  }

  & > figure {
    padding: 6 0;
    display: flex;
    flex-direction:column;
    align-items: center;
    max-width: initial;
    max-width: 100%;
    width: 100%;

    @media (min-width: lg){
      max-width: 84rem;
    }

    &.wp-block-image {
      width: 100%;

      img {
        width: 100%;
      }
    }

    table {
      border-collapse: collapse;
      
      td {
        padding: 2;
        border: 1px solid;
        border-color: gray-100;
      }
    }

    blockquote {
      text-align: center;
      padding: 4 0 12;

      border-right: 5px solid;
      border-left: 5px solid;
      border-color: zadruha-500;

      p {
        font-size: xl;
      }
    }

    &.wp-block-gallery {
      padding: 0 10;
      ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        

        li {
          list-style-type: none;

          figure {
            height: 200px;
            padding: 0;
            margin-bottom: 4;
          
            img {
              max-height: 100%;
            }
          }
        }
      }
    }

    figcaption {
      margin-top: 2;
      font-size: sm;
    }
  }

  ul li {
    list-style-type: disc;
    margin-left: 4;

    ul li {
      list-style-type: circle;
    }
  }

  ol li {
    list-style-type: decimal;
    margin-left: 6;

    ol li {
      list-style-type: lower-roman;
    }
  }

  ul, ol {
    margin-top: 2;
    margin-bottom: 2;
    margin-left: 1;
  }

  & > ul, & > ol {
    margin-top: 6;
    margin-bottom: 6;
  }

  pre {
    white-space: pre;
    padding: 4;
    border: 1px solid;
    border-color: gray-200;
    // @apply whitespace-pre overflow-x-auto p-4 text-sm leading-tight border border-gray-400 bg-gray-100;
  }

  .wp-block-cover {
    padding: 6 0;
    display: flex;
    flex-direction:column;
    align-items: center;
    max-width: initial;
    max-width: 84rem;
    width: 100%;
    position: relative;

    img {
      max-width: 100%;
      filter: brightness(0.4);
    }

    .wp-block-cover__inner-container {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      inset: 0;

      p {
        padding: 6 0;
        color: white;
        font-size: 3xl;
      }
    }

  }

  .wp-block-media-text {
    display: flex;
    padding: 6 0;
    flex-direction: column;
    align-items: center;

    @media (min-width: md){
      align-items: stretch;
      flex-direction: row;
    }

    max-width: 50rem;
    width: 100%;

    .wp-block-media-text__media {
      height: 400px;
      
      img {
        max-height: 100%;
      }
    }

    .wp-block-media-text__content {
      width: 100%;
      p {
        padding: 6 0;

        @media (min-width: md){
          padding: 0;
        }
      }
    }
  }
  
  .wp-block-buttons {
    padding: 6 0;
    max-width: 54rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .wp-block-button__link {
      padding: 4;
      background-color: zadruha-500;
      color: white;
      border-radius: 1;
    }
  }

  .wp-block-columns {
    display: flex;
    max-width: 54rem;
    width: 100%;

    .wp-block-column {
      flex-grow: 1;
    }
  }

  hr {
    margin: 6 0;
    border-bottom: 2px solid;
    border-color: gray-200;
    max-width: 54rem;
    width: 100%;
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

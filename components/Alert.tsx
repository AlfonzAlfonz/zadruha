import cn from "classnames";
import { FC } from "react";

import { Container } from "anolis-ui";

export const Alert: FC<{ preview?: boolean }> = ({ preview }) => {
  return (
    <div
      className={cn("border-b", {
        "bg-accent-7 border-accent-7 text-white": preview,
        "bg-accent-1 border-accent-2": !preview
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview && (
            <>
              This is a page preview.{" "}
              <a
                href="/api/exit-preview"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                Click here
              </a>{" "}
              to exit preview mode.
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

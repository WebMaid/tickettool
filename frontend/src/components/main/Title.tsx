import React from "react";

interface Props {
  content: string;
}

export const TitleComponent: React.FC<Props> = ({ content }) => {
  return (
    <>
      <h1>{content}</h1>
      <hr />
    </>
  );
};

import React from "react";

interface Props {
  data: any;
}

export const TableData: React.FC<Props> = ({ data }) => {
  const parsedData = parseData(data);
  const align = getAlignment(data);
  return (
    <div className={align}>
      <span>{parsedData}</span>
    </div>
  );
};

const parseData = (object: any): string => {
  if (!object) return "None";
  if (object instanceof Date) return object.toLocaleString();
  if (typeof object == "boolean") return object ? "Yes" : "No";
  if (typeof object == "object") return object.toString();
  return object.toString();
};

const getAlignment = (object: any): string => {
  if (
    object instanceof Date ||
    typeof object == "number" ||
    typeof object == "boolean" ||
    typeof object == "undefined"
  )
    return "right";
  return "left";
};

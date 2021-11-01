import React, { useState } from "react";
import { TableOrderDirectionEnum } from "../../objects/TableOrderDirection";

interface Props {
  name: string;
  displayName: string;
  orderDirection: TableOrderDirectionEnum | null;
  index: number;
  changeDirection: Function;
  removeColumn: Function | null;
}

export const TableHeaderElement: React.FC<Props> = ({
  name,
  displayName,
  orderDirection,
  index,
  changeDirection,
  removeColumn,
}) => {
  let displayIcon = "fa-sort";
  if (orderDirection === TableOrderDirectionEnum.ASC)
    displayIcon = "fa-sort-up";
  else if (orderDirection === TableOrderDirectionEnum.DESC)
    displayIcon = "fa-sort-down";
  return (
    <div>
      <span>{displayName}</span>
      <div className="buttons">
        <button className="fas fa-ellipsis-v icon"></button>
        <div className="dropdown"></div>
        <button
          className={`fas ${displayIcon} icon`}
          onClick={() => {
            changeDirection(name);
          }}
        ></button>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { TableDisplay } from "../../objects/TableDisplay";
import {
  TableOrderDirection,
  TableOrderDirectionEnum,
} from "../../objects/TableOrderDirection";
import { TableData } from "./TableData";
import { TableHeaderElement } from "./TableHeaderElement";

interface Props {
  data: any[];
  type: number; // TODO: Convert to enum
}

export const Table: React.FC<Props> = ({ data, type }) => {
  const defaultDisplay: TableDisplay[] = [
    {
      key: "id",
      displayName: "ID",
      removeable: false,
      display_default: true,
    },
    {
      key: "description",
      displayName: "Beschreibung",
      display_default: true,
    },
    {
      key: "created_at",
      displayName: "Erstellungsdatum",
      display_default: false,
    },
  ];
  const [localDisplay, setLocalDisplay] = useState(defaultDisplay);
  let [localData, setLocalData] = useState(data);
  const defaultOrder: TableOrderDirection = {
    key: localDisplay[0].key,
    direction: TableOrderDirectionEnum.ASC,
  };
  const [orderDirection, setOrderDirection] = useState(defaultOrder);
  const [displayable, setDisplayable] = useState(Object.keys(data[0]));

  console.log(localDisplay);

  const changeDirection = (name: string) => {
    let sort: TableOrderDirection;
    if (name === orderDirection.key) {
      let cp: TableOrderDirection = Object.assign({}, orderDirection);
      cp.direction *= -1;
      setOrderDirection(cp);
      sort = cp;
    } else {
      setOrderDirection({ key: name, direction: TableOrderDirectionEnum.ASC });
      sort = { key: name, direction: TableOrderDirectionEnum.ASC };
    }
    sortData(sort);
  };

  const sortData = (sort: TableOrderDirection) => {
    const { direction, key } = sort;
    if (localData.length < 1 || !Object.keys(localData[0]).includes(key))
      return;
    setLocalData(
      localData.sort((a, b) => {
        const asc = direction == TableOrderDirectionEnum.ASC;
        const o1 = a[key];
        const o2 = b[key];
        if (typeof o1 == "string" && typeof o2 == "string") {
          const res = o1.localeCompare(o2);
          return asc ? res : -res;
        }
        if (
          typeof o1 == "undefined" ||
          o1 == null ||
          typeof o2 == "undefined" ||
          o2 == null
        ) {
          if (o1 == o2) {
            return 0;
          }
          if (typeof o1 == "undefined" || o1 == null) {
            return asc ? -1 : 1;
          }
          if (typeof o2 == "undefined" || o2 == null) {
            return asc ? 1 : -1;
          }
        }
        if (a[key] < b[key]) {
          return asc ? -1 : 1;
        }
        if (b[key] < a[key]) {
          return asc ? 1 : -1;
        }
        return 0;
      })
    );
  };

  const openAddColumnModal = () => {};

  const removeColumn = (name: string) => {
    const cp = [...localDisplay];
    cp.splice(
      cp.findIndex((d) => d.key == name),
      1
    );
    setLocalDisplay(cp);
  };

  let table_type = "small";
  if (type != 0) table_type = type == 2 ? "big" : "medium";

  return (
    <table className={`margin-5em ${table_type}`}>
      <thead>
        <tr>
          {localDisplay.map((d, i, arr) => (
            <th key={d.key} scope="col">
              <TableHeaderElement
                name={d.key}
                displayName={d.displayName}
                orderDirection={
                  d.key == orderDirection.key ? orderDirection.direction : null
                }
                index={i}
                changeDirection={changeDirection}
                removeColumn={d.removeable !== false ? removeColumn : null}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {localData.map((dt: any, i) => (
          <tr key={i}>
            {localDisplay.map((d: TableDisplay) => (
              <td key={d.key}>
                <TableData data={dt[d.key]} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

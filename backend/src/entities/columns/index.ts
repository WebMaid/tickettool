import { DepartmentColumn } from "./DepartmentColumn";
import { ServiceColumn } from "./ServiceColumn";
import { TicketColumn } from "./TicketColumn";
import { TicketGroupColumn } from "./TicketGroupColumn";
import { UserColumn } from "./UserColumn";

export type Column =
  | TicketColumn
  | UserColumn
  | DepartmentColumn
  | ServiceColumn
  | TicketGroupColumn;

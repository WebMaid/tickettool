import { InputType, ObjectType } from "type-graphql";
import { DepartmentColumn } from "./DepartmentColumn";
import { ServiceColumn } from "./ServiceColumn";
import { TicketGroupColumn } from "./TicketGroupColumn";
import { UserColumn } from "./UserColumn";

@ObjectType()
export class TicketColumn {
  id?: string;
  ticket_id?: string;
  short_description?: string;
  description?: string;
  type?: string;
  status?: string;
  responsible_user?: UserColumn;
  responsible_department?: DepartmentColumn;
  previous_responsible_department?: DepartmentColumn;
  issuer?: UserColumn;
  issuer_department?: DepartmentColumn;
  service?: ServiceColumn;
  group?: TicketGroupColumn;
  owner_group?: TicketGroupColumn;
  created_at?: string;
  updated_at?: string;
  closed_at?: string;
}

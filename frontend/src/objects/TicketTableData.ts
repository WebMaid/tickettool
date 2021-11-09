export interface TicketTableDataUser {
  id: string;
  displayName: string;
  username: string;
  mail: string;
}

export interface TicketTableDataDepartment {
  id: string;
  name: string;
}

export interface TicketTableDataService {
  id: string;
  service_id: string;
  name: string;
}

export interface TicketTableDataGroup {
  id: string;
}

export interface TicketTableData {
  id: string;
  ticket_id: string;
  short_description: string;
  type: string;
  status: string;
  responsible_user?: TicketTableDataUser | null;
  responsible_department: TicketTableDataDepartment;
  issuer?: TicketTableDataUser | null;
  issuer_department: TicketTableDataDepartment;
  service: TicketTableDataService;
  group?: TicketTableDataGroup | null;
  created_at: string;
  updated_at: string;
  closed_at?: string;
}

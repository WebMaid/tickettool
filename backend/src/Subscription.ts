import { Ticket } from "./entities/Ticket";

export enum Subscriptions {
  CREATE_TICKET = "CREATE_TICKET",
  UPDATE_TICKET = "UPDATE_TICKET",
}

export type Subscription = {
  __typename?: "Subscription";
  ticketCreated: Ticket | null;
  ticketUpdated: Ticket | null;
};

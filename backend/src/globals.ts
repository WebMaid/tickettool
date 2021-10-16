import { Service } from "./entities/Service";
import { Ticket } from "./entities/Ticket";
import { define as defineUsers } from './helpers/UserData';

export const defineValues = async () => {
    ticket_count = await Ticket.count();
    service_count = await Service.count();
    await defineUsers();
}

export let ticket_count = 0;
export const set_ticket_count = (value: number) => {
    ticket_count = value;
}
export const add_ticket_count = (value: number) => {
    ticket_count += value;
}

export let service_count = 0;
export const set_service_count = (value: number) => {
    service_count = value;
}
export const add_service_count = (value: number) => {
    service_count += value;
}
import { Service } from "./entities/Service";
import { Ticket } from "./entities/Ticket";

export const defineValues = async () => {
    ticket_count = await Ticket.count();
    service_count = await Service.count();
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

// TODO: Move to auth
const SECRET_CHARS = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()[]{}/\\+-_:.;,£àÀÉéÈè°ç\"<>`?'´=¬|¢~ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generate_random_secret = (lenght: number) => {
    let password = "";
    for (let i = 0; i <= lenght; i++) {
        const randomNumber = Math.floor(Math.random() * SECRET_CHARS.length);
        password += SECRET_CHARS.substring(randomNumber, randomNumber +1);
    }
    return password;
} 
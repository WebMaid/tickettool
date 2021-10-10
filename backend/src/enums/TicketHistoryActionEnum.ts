export enum TicketHistoryActionEnum {
    RETURN = "return", // returned the ticket to xyz with reason xyz
    SEND_TO = "send-to", // sent the ticket to xyz with request xyz
    CHANGE = "change", // changed value of xyz from xyz to xyz
    SOLVE = "solve", // solved the ticket with status xyz and solution xyz
    CLOSE = "close", // closed the ticket with reason xyz
    OPEN = "open", // opened the ticket as xyz
    REOPEN = "reopen", // reopened the ticket with reason xyz
    GROUP_ADD = "group-add", // added the ticket to group xyz with reason xyz
    GROUP_REMOVE = "group-remove", // removed the ticket from group xyz with reason xyz
}
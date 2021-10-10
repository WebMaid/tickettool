export enum ServiceHistoryActionEnum {
    CHANGE = "change",      // changed value of xyz from xyz to xyz
    ARCHIVE = "archive",    // archived the service with reason xyz
    CREATE = "create",      // created the service as xyz
    RESTORE = "restore",    // restored the service with reason xyz
}
import { StatementStatus } from "../constants/statement-status.enum"

export type Payload = {
    id: number,
    currentStatus: StatementStatus
}
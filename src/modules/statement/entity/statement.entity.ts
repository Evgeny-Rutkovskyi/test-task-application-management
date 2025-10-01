import { StatementStatus } from "../../../common/lib/constants/statement-status.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'statements' })
export class Statement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({
        type: 'enum',
        enum: StatementStatus,
        default: StatementStatus.NEW
    })
    status: StatementStatus
}
import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Competition } from './competition.entity';

@Entity({ name: 'User' })
export class User {
    @PrimaryColumn({ type: 'varchar' })
    public name: string;

    @Column({ type: 'real' })
    public mu: number;

    @Column({ type: 'real' })
    public sigma: number;

    @ManyToOne('Competition', 'users')
    @JoinColumn({
        name: 'competitionName',
        referencedColumnName: 'name'
    })
    public competition: Competition;

    @Column({ type: 'varchar' })
    public competitionName: string;

    @CreateDateColumn({type: 'timestamp'})
    public createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    public updatedAt: Date;
}

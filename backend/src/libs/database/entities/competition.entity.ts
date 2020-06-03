import {
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Competition' })
export class Competition {
    @PrimaryColumn({ type: 'varchar' })
    public name: string;

    @CreateDateColumn({type: 'timestamp'})
    public createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    public updatedAt: Date;

    @OneToMany('User', 'competition')
    public users: User[];
}

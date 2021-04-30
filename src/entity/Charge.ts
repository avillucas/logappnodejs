import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { IsNotEmpty, Min } from 'class-validator';

@Entity()
export class Charge {   

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user=> user.credits)
    @JoinColumn()
    owner: User;
    
    @Column()
    @IsNotEmpty()
    @Min(1)
    credit: number;

    @Column()
    @IsNotEmpty()    
    rechargeCode:string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
}

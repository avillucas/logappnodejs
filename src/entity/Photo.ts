import { User } from './User';
import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { MinLength}  from 'class-validator';
import { Vote } from './Vote';


@Entity()
export class Photo {   

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: false })
    @MinLength(4)    
    url: string;

    @OneToOne(() => User,{  eager: true})
    @JoinColumn()
    owner: User;

    @OneToMany(() => Vote, vote => vote.photo,{  eager: true})
    votes: Vote[];


    @Column()
    @CreateDateColumn()
    createdAt: Date;
}

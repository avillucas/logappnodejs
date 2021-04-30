import { User } from './User';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { MinLength}  from 'class-validator';
import { Vote } from './Vote';


@Entity()
export class Photo {   

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: false })
    @MinLength(4)    
    url: string;

    @ManyToOne(() => User, user => user.photos)
    @JoinColumn()
    owner: User;

    @OneToMany(() => Vote, vote => vote.photo,{  eager: true})
    @JoinColumn()
    votes: Vote[];


    @Column()
    @CreateDateColumn()
    createdAt: Date;
}

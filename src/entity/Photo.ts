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

    @ManyToOne(() => User, user => user.photos,{  eager: true})
    @JoinColumn()
    owner: User;
    
    @OneToMany(() => Vote, vote => vote.photo,{  eager: true})
    @JoinColumn()
    votes: Vote[];

    @Column({default:0, nullable:true})
    likes:number
    
    @Column({default:0, nullable:true})
    dislikes:number

    @Column()
    @CreateDateColumn()
    createdAt: Date;
}

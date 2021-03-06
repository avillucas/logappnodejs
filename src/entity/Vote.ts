import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Photo } from './Photo';
import { User } from './User';

@Entity()
export class Vote {   

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Photo, photo => {photo.votes})
    @JoinColumn()
    photo: Photo;

    @Column({nullable: false })    
    like: boolean;

    @ManyToOne(() => User,{  eager: true})
    @JoinColumn()
    voter: User;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
}

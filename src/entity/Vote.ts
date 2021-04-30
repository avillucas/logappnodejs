import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Photo from '../controller/PhotosController';
import { User } from './User';

@Entity()
export class Vote {   

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: false })
    @ManyToOne(() => Photo, photo => photo.votes,{  eager: true})    
    photo: Photo;

    @Column({nullable: false })    
    like: boolean;

    @OneToOne(() => User,{  eager: true})
    @JoinColumn()
    voter: User;
}

import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import {MaxLength, MinLength, IsNotEmpty, IsEmail}  from 'class-validator';
import * as bcrypt from 'bcryptjs'
import { Charge } from './Charge';
import { Photo } from './Photo';

@Entity()
@Unique(['username'])
export class User {   

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: false })
    @MinLength(4)    
    name: string;

    @Column({nullable: false })
    @MinLength(4)    
    surname: string;

    @Column({nullable: false })
    @MinLength(6)
    @IsEmail()
    username: string;

    @Column(({ type: 'varchar', length: 100, nullable: false }))
    @MinLength(6)
    @IsNotEmpty()    
    password: string;

    @Column({ nullable: false })
    @IsNotEmpty()
    role: string;
    
    @Column({ nullable: false })
    @IsNotEmpty()
    dni: string;

    @Column({ nullable: false, type:'varchar', default:'F', length:1 })    
    @MinLength(1)
    @MaxLength(1)
    sexo: string;

    @Column({ nullable: true, type:'varchar', default:null, length:1 })    
    @MinLength(1)
    @MaxLength(1)
    avatar: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;


    @JoinColumn()
    @OneToMany(() => Photo, photo => photo.owner)
    photos: Photo[];

    @JoinColumn()
    @OneToMany(() => Charge, charge => charge.owner)
    credits: Charge[];
    
    @Column({default:0,nullable:true})
    credit:number;

    @BeforeInsert()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(password || this.password, salt)
    }
    
    checkPassword(password:string):boolean{
        return bcrypt.compareSync(password,this.password);
    }
}

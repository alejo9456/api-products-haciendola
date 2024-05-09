import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text', {
        unique: true,
    })
    handle: string;
    
    @Column('text')
    description: string;

    @Column('text', {
        unique: true
    })
    sku: string;

    @Column('float')
    grams: number;
    
    @Column('int', {
        default: 0
    })
    stock: number;

    @Column('float')
    price: number;

    @Column('float')
    compare_price:number;

    @Column('text')
    barcode: string;


    @BeforeInsert()
    checkHandleInsert(){

        if( !this.handle){
            this.handle = this.title;
        }

        this.handle = this.handle
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkHandleUpdate(){
        this.handle = this.handle
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

}

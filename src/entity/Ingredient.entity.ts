import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";

import Model from "./Model.entity";
import { Cuisine } from "./Cuisine.entity";
import { Dish } from "./Dish.entity";
import { Quantity } from "./quantity.entity";

@Entity('Ingredient')
export class  Ingredient extends Model {
    

   

    @Column()
    name: string;
    
    @Column({default:false,nullable:true})
    checklist:boolean ;

    @ManyToMany(type => Dish, dish => dish.ingredients)
    dish: Dish;

    @ManyToMany(type => Quantity,  { cascade: true })
    @JoinTable()
    quantities: Quantity[];
}

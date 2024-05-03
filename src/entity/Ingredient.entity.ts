import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

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

    @ManyToOne(type => Dish, dish => dish.ingredients)
    dish: Dish;

    @OneToMany(type => Quantity, quantity => quantity.ingredient, { cascade: true })
    quantities: Quantity[];
}

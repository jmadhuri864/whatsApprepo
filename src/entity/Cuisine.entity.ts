import { Entity,  Column, OneToMany } from "typeorm";

import Model from "./Model.entity";
import {  } from "./Ingredient.entity";
import { Dish } from "./Dish.entity";

@Entity('Cuisine')
export class Cuisine  extends Model{
    

    @Column()
    name: string;

    @OneToMany(() => Dish, dish => dish.cuisine)
    dishes: Dish[];
}

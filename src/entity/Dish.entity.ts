import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

import Model from "./Model.entity";
import { Ingredient} from "./Ingredient.entity";
import { Cuisine } from "./Cuisine.entity";

@Entity('Dish')
export class Dish  extends Model{
    

    @Column()
    name: string;

    @OneToMany(type => Ingredient, ingredient => ingredient.dish,{cascade:true})
    ingredients: Ingredient[];
    @ManyToOne(() => Cuisine, cuisine => cuisine.dishes)
    cuisine: Cuisine;
   
}

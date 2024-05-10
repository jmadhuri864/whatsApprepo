import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";

import Model from "./Model.entity";
import { Ingredient} from "./Ingredient.entity";
import { Cuisine } from "./Cuisine.entity";

@Entity('Dish')
export class Dish  extends Model{
    

    @Column()
    name: string;

    @ManyToMany(type => Ingredient, ingredient => ingredient.dish,{cascade:true})
    @JoinTable()
    ingredients: Ingredient[];
    @ManyToOne(() => Cuisine, cuisine => cuisine.dishes)
    cuisine: Cuisine;
   
}

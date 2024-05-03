import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./Model.entity";
import { Ingredient } from "./Ingredient.entity";



@Entity('Quantity')
export class Quantity  extends Model{
    
@Column('decimal', { precision: 10, scale: 2 })
    quantity: number;

    @Column()
    units: string;

    @ManyToOne(type => Ingredient, ingredient => ingredient.quantities)
    ingredient: Ingredient;
}
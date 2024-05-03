import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  BeforeInsert,
} from "typeorm";
import Model from "./Model.entity";
import bcrypt from "bcryptjs";

@Entity('users')
export class User extends Model {
  @Index("email_index")
  @Column({
    unique: true,
  })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    default: true,
  })
  verified: boolean;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    // Ensure both candidatePassword and hashedPassword are not null or undefined
    if (!candidatePassword || !hashedPassword) {
      throw new Error("Invalid candidate or hashed password");
    }

    // Log or debug the values of candidatePassword and hashedPassword
    //console.log('Candidate Password:', candidatePassword);
    //console.log('Hashed Password:', hashedPassword);

    // Perform password comparison
    return await bcrypt.compare(candidatePassword, hashedPassword);
    //return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
}

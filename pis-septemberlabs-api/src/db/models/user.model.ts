import {
  AllowNull,
  BelongsToMany,
  Column,
  IsEmail,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import Survey from './survey.model';
import Participation from './participation.model';

@Table({
  timestamps: true,
  paranoid: true,
  deletedAt: 'deletionDate',
})
export class User extends Model<User> {
  @BelongsToMany(() => Survey, () => Participation)
  surveys: Survey[];

  @AllowNull(false)
  @Column
  public name: string;

  @AllowNull(false)
  @Column
  public lastName: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column
  public email: string;

  @AllowNull(false)
  @Column
  public role: string;
}

export default User;

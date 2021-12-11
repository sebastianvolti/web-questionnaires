import {
  AllowNull,
  Column,
  Model,
  Table,
  HasMany,
  BelongsToMany,
  Unique,
} from 'sequelize-typescript';
import User from './user.model';
import Participation from './participation.model';
import Question from './question.model';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Survey extends Model<Survey> {
  @BelongsToMany(() => User, () => Participation)
  users: User[];

  @HasMany(() => Participation)
  participations: Participation[];

  @HasMany(() => Question)
  questions: Question[];

  @AllowNull(false)
  @Column
  public title: string;

  @AllowNull(false)
  @Column
  public projectName: string;

  @AllowNull(false)
  @Column
  public status: string;

  @Unique
  @Column
  public hash: string;

  @Column
  public startedAt: Date;

  @Column
  public endedAt: Date;
}

export default Survey;

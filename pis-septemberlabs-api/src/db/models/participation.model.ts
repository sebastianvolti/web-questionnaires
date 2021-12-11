import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import User from './user.model';
import Survey from './survey.model';
import Answer from './answer.model';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Participation extends Model<Participation> {
  @AutoIncrement
  @Column({ primaryKey: true })
  id: number;

  @HasMany(() => Answer)
  answers: Answer[];

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Survey)
  survey: Survey;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Survey)
  @Column
  surveyId: number;

  @Column
  status: string;
}

export default Participation;

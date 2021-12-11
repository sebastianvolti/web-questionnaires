import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import Participation from './participation.model';
import Question from './question.model';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Answer extends Model<Answer> {
  @BelongsTo(() => Participation)
  participation: Participation;

  @ForeignKey(() => Participation)
  @Column
  participationId: number;

  @BelongsTo(() => Question)
  question: Question;

  @ForeignKey(() => Question)
  @Column
  questionId: number;

  @Column(DataType.JSON)
  public answer: JSON;
}

export default Answer;

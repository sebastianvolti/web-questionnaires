import {
  AllowNull,
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import Survey from './survey.model';
import QuestionType from './questionType.model';
import Answer from './answer.model';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Question extends Model<Question> {
  @HasMany(() => Answer)
  answers: Answer[];

  @BelongsTo(() => QuestionType)
  questionType: QuestionType;

  @ForeignKey(() => QuestionType)
  @Column
  questionTypeId: number;

  @BelongsTo(() => Survey)
  survey: Survey;

  @ForeignKey(() => Survey)
  @Column
  surveyId: number;

  @AllowNull(false)
  @Column
  public description: string;

  @AllowNull(false)
  @Column
  public required: boolean;

  @AllowNull(true)
  @Column(DataType.JSON)
  public parameters: JSON;
}

export default Question;

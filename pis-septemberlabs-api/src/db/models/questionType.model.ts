import {
  AllowNull,
  Column,
  Model,
  Table,
  Unique,
  DataType,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
})
export class QuestionType extends Model<QuestionType> {
  @AllowNull(false)
  @Unique
  @Column
  public name: string;

  @AllowNull(true)
  @Column(DataType.JSON)
  public inputSchema: JSON;

  @AllowNull(false)
  @Column(DataType.JSON)
  public outputSchema: JSON;
}

export default QuestionType;

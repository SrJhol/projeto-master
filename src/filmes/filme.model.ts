import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'filmes', timestamps: false })
export class Filme extends Model<Filme> {
  @Column({
    field: 'filme',
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare filme: number;

  @Column({ type: DataType.TINYINT, allowNull: true })
  declare estilo?: number;

  @Column({ type: DataType.CHAR(30), allowNull: false })
  declare nome: string;

  @Column({ type: DataType.CHAR(4), allowNull: false })
  declare ano: string;

  @Column({ field: 'duracao', type: DataType.CHAR(3), allowNull: false })
  declare duracao: string;

  @Column({ type: DataType.CHAR(45), allowNull: false })
  declare foto: string;

  @Column({ type: DataType.TEXT('long'), allowNull: true })
  declare sinopse?: string;

  @Column({ type: DataType.CHAR(45), allowNull: true })
  declare video?: string;
}

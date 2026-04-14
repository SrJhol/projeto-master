import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Filme } from '../filmes/filme.model';

@Table({ tableName: 'locacoes', timestamps: false })
export class Locacao extends Model<Locacao> {
  @Column({ field: 'locacao', type: DataType.DOUBLE, primaryKey: true, allowNull: false })
  declare locacao: number;

  @ForeignKey(() => Filme)
  @Column({ field: 'filme', type: DataType.INTEGER, allowNull: true })
  declare filmeId?: number;

  @BelongsTo(() => Filme)
  filme?: Filme;

  @Column({ type: DataType.DECIMAL(18, 0), allowNull: true })
  declare cliente?: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare emissao: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare devolucao?: Date;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  valor?: number;
}

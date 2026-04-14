import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Filme } from '../filmes/filme.model';
import { CreateLocacaoDto } from './dto/create-locacao.dto';
import { UpdateLocacaoDto } from './dto/update-locacao.dto';
import { Locacao } from './locacao.model';

@Injectable()
export class LocacoesService {
  constructor(@InjectModel(Locacao) private locacaoModel: typeof Locacao) {}

  async create(createLocacaoDto: CreateLocacaoDto): Promise<Locacao> {
    return this.locacaoModel.create(createLocacaoDto as any);
  }

  async findAll(nome?: string): Promise<Locacao[]> {
    const where = nome
      ? { '$filme.nome$': { [Op.like]: `%${nome}%` } }
      : undefined;

    return this.locacaoModel.findAll({
      where,
      include: [Filme],
    });
  }

  async findOne(id: number): Promise<Locacao> {
    const locacao = await this.locacaoModel.findByPk(id, { include: [Filme] });
    if (!locacao) {
      throw new NotFoundException(`Locação com id ${id} não encontrada`);
    }
    return locacao;
  }

  async update(id: number, updateLocacaoDto: UpdateLocacaoDto): Promise<Locacao> {
    const locacao = await this.findOne(id);
    await locacao.update(updateLocacaoDto as any);
    return locacao;
  }

  async remove(id: number): Promise<void> {
    const locacao = await this.findOne(id);
    await locacao.destroy();
  }
}

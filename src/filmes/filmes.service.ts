import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from './filme.model';

@Injectable()
export class FilmesService {
  constructor(@InjectModel(Filme) private filmeModel: typeof Filme) {}

  async create(createFilmeDto: CreateFilmeDto): Promise<Filme> {
    return this.filmeModel.create(createFilmeDto);
  }

  async findAll(nome?: string): Promise<Filme[]> {
    const where = nome ? { nome: { [Op.like]: `%${nome}%` } } : undefined;

    return this.filmeModel.findAll({ where });
  }

  async findOne(id: number): Promise<Filme> {
    const filme = await this.filmeModel.findByPk(id);
    if (!filme) {
      throw new NotFoundException(`Filme com id ${id} não encontrado`);
    }
    return filme;
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto): Promise<Filme> {
    const filme = await this.findOne(id);
    await filme.update(updateFilmeDto);
    return filme;
  }

  async remove(id: number): Promise<void> {
    const filme = await this.findOne(id);
    await filme.destroy();
  }
}

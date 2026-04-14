import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { FilmesService } from './filmes.service';
import { Filme } from './filme.model';

@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @Post()
  create(@Body() createFilmeDto: CreateFilmeDto): Promise<Filme> {
    return this.filmesService.create(createFilmeDto);
  }

  @Get()
  findAll(@Query('nome') nome?: string): Promise<Filme[]> {
    return this.filmesService.findAll(nome);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Filme> {
    return this.filmesService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFilmeDto: UpdateFilmeDto,
  ): Promise<Filme> {
    return this.filmesService.update(Number(id), updateFilmeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.filmesService.remove(Number(id));
  }
}

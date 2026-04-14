import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateLocacaoDto } from './dto/create-locacao.dto';
import { UpdateLocacaoDto } from './dto/update-locacao.dto';
import { LocacoesService } from './locacoes.service';
import { Locacao } from './locacao.model';

@Controller('locacoes')
export class LocacoesController {
  constructor(private readonly locacoesService: LocacoesService) {}

  @Post()
  create(@Body() createLocacaoDto: CreateLocacaoDto): Promise<Locacao> {
    return this.locacoesService.create(createLocacaoDto);
  }

  @Get()
  findAll(@Query('nome') nome?: string): Promise<Locacao[]> {
    return this.locacoesService.findAll(nome);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Locacao> {
    return this.locacoesService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLocacaoDto: UpdateLocacaoDto): Promise<Locacao> {
    return this.locacoesService.update(Number(id), updateLocacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.locacoesService.remove(Number(id));
  }
}

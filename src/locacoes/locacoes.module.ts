import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Filme } from '../filmes/filme.model';
import { Locacao } from './locacao.model';
import { LocacoesController } from './locacoes.controller';
import { LocacoesService } from './locacoes.service';

@Module({
  imports: [SequelizeModule.forFeature([Locacao, Filme])],
  controllers: [LocacoesController],
  providers: [LocacoesService],
})
export class LocacoesModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Filme } from './filme.model';
import { FilmesController } from './filmes.controller';
import { FilmesService } from './filmes.service';

@Module({
  imports: [SequelizeModule.forFeature([Filme])],
  controllers: [FilmesController],
  providers: [FilmesService],
})
export class FilmesModule {}

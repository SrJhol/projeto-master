import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Filme } from './filmes/filme.model';
import { Locacao } from './locacoes/locacao.model';
import { FilmesModule } from './filmes/filmes.module';
import { LocacoesModule } from './locacoes/locacoes.module';
import { SequelizeConfigService } from './config/sequelize.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    FilmesModule,
    LocacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService, SequelizeConfigService],
})
export class AppModule {}

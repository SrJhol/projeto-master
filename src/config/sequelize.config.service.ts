import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeOptionsFactory, SequelizeModuleOptions } from '@nestjs/sequelize';
import { createConnection } from 'mysql2/promise';
import { Filme } from '../filmes/filme.model';
import { Locacao } from '../locacoes/locacao.model';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  private getHost(): string {
    return this.configService.get<string>('DB_HOST') ?? this.configService.get<string>('MYSQL_HOST') ?? 'localhost';
  }

  private getPort(): number {
    const port = this.configService.get<number>('DB_PORT') ?? this.configService.get<number>('MYSQL_PORT');
    return port ?? 3306;
  }

  private getUsername(): string {
    return this.configService.get<string>('DB_USER') ?? this.configService.get<string>('MYSQL_USER') ?? 'root';
  }

  private getPassword(): string {
    return this.configService.get<string>('DB_PASS') ?? this.configService.get<string>('DB_PASSWORD') ?? '';
  }

  private getDatabase(): string {
    return (
      this.configService.get<string>('DB_NAME') ??
      this.configService.get<string>('DB_DATABASE') ??
      'projeto'
    );
  }

  private async ensureDatabaseExists(): Promise<void> {
    const database = this.getDatabase();
    const connection = await createConnection({
      host: this.getHost(),
      port: this.getPort(),
      user: this.getUsername(),
      password: this.getPassword(),
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await connection.end();
  }

  async createSequelizeOptions(): Promise<SequelizeModuleOptions> {
    await this.ensureDatabaseExists();

    return {
      dialect: 'mysql',
      host: this.getHost(),
      port: this.getPort(),
      username: this.getUsername(),
      password: this.getPassword(),
      database: this.getDatabase(),
      models: [Filme, Locacao],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    };
  }
}

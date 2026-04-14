import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeConfigService } from './sequelize.config.service';
import { ConfigService } from '@nestjs/config';
import { describe, beforeEach, it } from 'node:test';

describe('SequelizeConfigService', () => {
  let service: SequelizeConfigService;

  beforeEach(async () => {
    const mockConfigService = {
      get: jest.fn((key: string) => {
        switch (key) {
          case 'DB_HOST':
            return 'localhost';
          case 'DB_PORT':
            return 3306;
          case 'DB_USER':
            return 'user';
          case 'DB_PASS':
            return 'password';
          case 'DB_NAME':
            return 'database';
          default:
            return null;
        }
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SequelizeConfigService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<SequelizeConfigService>(SequelizeConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return sequelize options', () => {
    const options = service.createSequelizeOptions();

    expect(options).toEqual({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'database',
      autoLoadModels: true,
      synchronize: true,
      models: expect.any(Array),
      logging: false,
    });
  });
});

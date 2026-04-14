import { CreateFilmeDto } from './create-filme.dto';

export class UpdateFilmeDto implements Partial<CreateFilmeDto> {
  estilo?: number;
  nome?: string;
  ano?: string;
  duracao?: string;
  foto?: string;
  sinopse?: string;
  video?: string;
}

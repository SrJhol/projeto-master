import { CreateLocacaoDto } from './create-locacao.dto';

export class UpdateLocacaoDto implements Partial<CreateLocacaoDto> {
  locacao?: number;
  filmeId?: number;
  cliente?: string;
  emissao?: Date;
  devolucao?: Date;
  valor?: number;
}

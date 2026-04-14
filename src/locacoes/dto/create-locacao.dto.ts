export class CreateLocacaoDto {
  locacao: number;
  filmeId?: number;
  cliente?: string;
  emissao: Date;
  devolucao?: Date;
  valor?: number;
}

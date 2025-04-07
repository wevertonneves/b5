import { validarCPF } from './validarCPF';

describe('Função validarCPF', () => {
  it('deve retornar true para um CPF válido', () => {
    expect(validarCPF('52998224725')).toBe(true); 
  });

  it('deve retornar false para um CPF com dígitos verificadores incorretos', () => {
    expect(validarCPF('52998224724')).toBe(false);
  });

  it('deve retornar false para um CPF com menos de 11 dígitos', () => {
    expect(validarCPF('123')).toBe(false);
  });

  it('deve retornar false para um CPF com mais de 11 dígitos', () => {
    expect(validarCPF('1234567890123456')).toBe(false);
  });

  it('deve retornar false para um CPF com caracteres não numéricos', () => {
    expect(validarCPF('abc.def.ghi-jk')).toBe(false);
  });

  it('deve retornar false para um CPF com todos os dígitos iguais', () => {
    expect(validarCPF('0000000000')).toBe(false);
  });

  it('deve aceitar CPF formatado corretamente com pontos e traço', () => {
    expect(validarCPF('529.982.247-25')).toBe(true);
  });
});

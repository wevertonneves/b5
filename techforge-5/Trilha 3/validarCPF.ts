export function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');

  if (!/^\d{11}$/.test(cpf)) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  const calcularDigito = (cpfArray: number[], fator: number): number => {
    let soma = 0;
    for (let i = 0; i < cpfArray.length; i++) {
      soma += cpfArray[i] * fator--;
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const cpfNumeros = cpf.split('').map(Number);
  const digito1 = calcularDigito(cpfNumeros.slice(0, 9), 10);
  const digito2 = calcularDigito([...cpfNumeros.slice(0, 9), digito1], 11);

  return digito1 === cpfNumeros[9] && digito2 === cpfNumeros[10];
}

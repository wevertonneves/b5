import { validarCPF } from './validarCPF';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o CPF (somente números ou formatado): ', (cpf: string) => {
  const resultado = validarCPF(cpf);
  console.log(`CPF ${cpf} é ${resultado ? 'VÁLIDO' : 'INVÁLIDO'}`);
  rl.close();
});

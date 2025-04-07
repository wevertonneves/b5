import * as readline from "readline";

type Bandeira = "verde" | "amarela" | "vermelha";

interface ConsumoEnergia {
  consumo: number;
  tarifa: number;
  percentualImposto: number;
  bandeira: Bandeira;
}


function calcularValorBase(consumo: number, tarifa: number): number {
  return consumo * tarifa;
}


function calcularAjusteBandeira(consumo: number, bandeira: string): number {
  switch (bandeira) {
    case "amarela":
      return consumo * 0.02;
    case "vermelha":
      return consumo * 0.05;
    case "verde":
    default:
      return 0;
  }
}


function calcularImposto(valor: number, percentualImposto: number): number {
  return valor * (percentualImposto / 100);
}


function aplicarIncentivoConsumoEficiente(valor: number, consumo: number): number {
  if (consumo <= 100) {
    return valor * 0.95; // desconto de 5%
  } else if (consumo > 300) {
    return valor * 1.10; // acréscimo de 10%
  }
  return valor; // sem ajuste
}


function calcularContaEnergia(consumo: ConsumoEnergia): number {
  const valorBase = calcularValorBase(consumo.consumo, consumo.tarifa);
  const ajusteBandeira = calcularAjusteBandeira(consumo.consumo, consumo.bandeira);
  const subtotal = valorBase + ajusteBandeira;
  const imposto = calcularImposto(subtotal, consumo.percentualImposto);

  const totalComImposto = subtotal + imposto;

  
  const valorFinal = aplicarIncentivoConsumoEficiente(totalComImposto, consumo.consumo);

  return parseFloat(valorFinal.toFixed(2));
}


function exibirValores(consumoInformado: number) {
  const tarifa = 0.5;
  const imposto = 10;
  const bandeiras: Bandeira[] = ["verde", "amarela", "vermelha"];

  console.log(`\n Consumo informado: ${consumoInformado} kWh`);
  console.log("Resultados com tarifa R$ 0,50/kWh, imposto 10% e ajuste por consumo eficiente:\n");

  bandeiras.forEach((bandeira) => {
    const valor = calcularContaEnergia({
      consumo: consumoInformado,
      tarifa,
      percentualImposto: imposto,
      bandeira,
    });

    console.log(`Bandeira ${bandeira.toUpperCase()}: R$ ${valor}`);
  });

  console.log("\n Cálculo finalizado.");
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Informe o consumo em kWh: ", (input) => {
  const consumo = parseFloat(input);

  if (isNaN(consumo) || consumo <= 0) {
    console.log(" Valor inválido. Informe um número positivo.");
  } else {
    exibirValores(consumo);
  }

  rl.close();
});

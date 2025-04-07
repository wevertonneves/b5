"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
function calcularValorBase(consumo, tarifa) {
    return consumo * tarifa;
}
function calcularAjusteBandeira(consumo, bandeira) {
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
function calcularImposto(valor, percentualImposto) {
    return valor * (percentualImposto / 100);
}
function aplicarIncentivoConsumoEficiente(valor, consumo) {
    if (consumo <= 100) {
        return valor * 0.95; // desconto de 5%
    }
    else if (consumo > 300) {
        return valor * 1.10; // acréscimo de 10%
    }
    return valor; // sem ajuste
}
function calcularContaEnergia(consumo) {
    var valorBase = calcularValorBase(consumo.consumo, consumo.tarifa);
    var ajusteBandeira = calcularAjusteBandeira(consumo.consumo, consumo.bandeira);
    var subtotal = valorBase + ajusteBandeira;
    var imposto = calcularImposto(subtotal, consumo.percentualImposto);
    var totalComImposto = subtotal + imposto;
    var valorFinal = aplicarIncentivoConsumoEficiente(totalComImposto, consumo.consumo);
    return parseFloat(valorFinal.toFixed(2));
}
function exibirValores(consumoInformado) {
    var tarifa = 0.5;
    var imposto = 10;
    var bandeiras = ["verde", "amarela", "vermelha"];
    console.log("\n\uD83D\uDCA1 Consumo informado: ".concat(consumoInformado, " kWh"));
    console.log("Resultados com tarifa R$ 0,50/kWh, imposto 10% e ajuste por consumo eficiente:\n");
    bandeiras.forEach(function (bandeira) {
        var valor = calcularContaEnergia({
            consumo: consumoInformado,
            tarifa: tarifa,
            percentualImposto: imposto,
            bandeira: bandeira,
        });
        console.log("\uD83D\uDD38 Bandeira ".concat(bandeira.toUpperCase(), ": R$ ").concat(valor));
    });
    console.log("\n Cálculo finalizado.");
}
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question("Informe o consumo em kWh: ", function (input) {
    var consumo = parseFloat(input);
    if (isNaN(consumo) || consumo <= 0) {
        console.log(" Valor inválido. Informe um número positivo.");
    }
    else {
        exibirValores(consumo);
    }
    rl.close();
});

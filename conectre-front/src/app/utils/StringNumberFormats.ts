export class StringNumberFormats {

  static formatCelular(celular) {
    if (celular.length !== 11) {
      throw new Error("O número de telefone deve ter 11 dígitos.");
    }

    const ddd = celular.substring(0, 2);
    const firstPart = celular.substring(2, 3);
    const secondPart = celular.substring(3, 7);
    const thirdPart = celular.substring(7);

    return `(${ddd}) ${firstPart} ${secondPart}-${thirdPart}`;
  }

}

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

  static formatCpfCnpj(cpfCnpj) {
    if (cpfCnpj.length === 11) {
      return cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (cpfCnpj.length === 14) {
      return cpfCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else {
      return cpfCnpj;
    }
  }

  static removeBeforeHifen(list) {
    return list.map(item => {
      const parts = item.split(" - ");
      return parts[0].trim();
    });

  }

}

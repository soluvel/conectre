package com.soluvel.conectre.utils;

public class StringFormat {

    public static String removeSpecialCharacters(String input) {
        return input.replaceAll("[^a-zA-Z0-9]", "");
    }

    public static String formatCelular(String celular) {
        if (celular.length() != 11) {
            throw new IllegalArgumentException("O número de telefone deve ter 11 dígitos.");
        }

        String ddd = celular.substring(0, 2);
        String firstPart = celular.substring(2, 3);
        String secondPart = celular.substring(3, 7);
        String thirdPart = celular.substring(7);

        return String.format("(%s) %s %s-%s", ddd, firstPart, secondPart, thirdPart);
    }
}

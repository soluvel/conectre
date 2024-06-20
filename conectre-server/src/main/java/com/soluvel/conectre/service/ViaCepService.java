package com.soluvel.conectre.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.soluvel.conectre.domain.Endereco;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
@AllArgsConstructor
public class ViaCepService {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public Endereco getEndereco(String cep) throws IOException, InterruptedException {

        if (cep.length() != 8) {
            return new Endereco();
        }

        var uri = UriComponentsBuilder.fromUriString("https://viacep.com.br/ws/{cep}/json/")
                .buildAndExpand(cep)
                .toUri();

        var httpRequest = HttpRequest.newBuilder().uri(uri).GET().build();
        var httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

        return objectMapper.readValue(httpResponse.body(), Endereco.class);

    }

}

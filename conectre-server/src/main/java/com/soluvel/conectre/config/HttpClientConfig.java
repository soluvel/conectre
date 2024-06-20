package com.soluvel.conectre.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.http.HttpClient;

@Configuration
@AllArgsConstructor
public class HttpClientConfig {

    @Bean
    public HttpClient httpClient() {
        return HttpClient.newHttpClient();
    }

}

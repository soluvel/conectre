package com.soluvel.conectre.controller;

import com.soluvel.conectre.domain.Medicao;
import com.soluvel.conectre.repository.MedicaoRepository;
import com.soluvel.conectre.service.ExcelService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/excel")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ExcelController {

    private final ExcelService excelService;
    private final MedicaoRepository medicaoRepository;

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadExcel() throws IOException {
        List<Medicao> dataList = medicaoRepository.findAll();

        byte[] excelContent = excelService.generateExcel(dataList);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "data.xlsx");

        return ResponseEntity.ok().headers(headers).body(excelContent);
    }
}

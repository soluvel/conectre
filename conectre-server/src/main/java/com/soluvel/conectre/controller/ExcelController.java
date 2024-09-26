package com.soluvel.conectre.controller;

import com.soluvel.conectre.domain.Medicao;
import com.soluvel.conectre.repository.MedicaoRepository;
import com.soluvel.conectre.service.ExcelService;
import com.soluvel.conectre.service.MedicaoService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/excel")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ExcelController {

    private final ExcelService excelService;
    private final MedicaoRepository medicaoRepository;
    private final MedicaoService service;

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadExcel() throws IOException {
        List<Medicao> dataList = medicaoRepository.findAll();

        byte[] excelContent = excelService.generateExcel(dataList);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "data.xlsx");

        return ResponseEntity.ok().headers(headers).body(excelContent);
    }

    @GetMapping("/download-somatoria")
    public ResponseEntity<byte[]> downloadExcelSomatoria() throws IOException {
        Medicao medicao = service.somarValores(LocalDate.of(2024,1,1), LocalDate.now());

        byte[] excelContent = excelService.generateExcel(List.of(medicao));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "data.xlsx");

        return ResponseEntity.ok().headers(headers).body(excelContent);
    }

    @GetMapping("/download-pdf")
    public ResponseEntity<Resource> downloadPdf() throws IOException {
        String filePath = "C:/Users/kassi/Downloads/pdf-donwload.pdf";
        Path path = Paths.get(filePath);
        Resource resource = new ByteArrayResource(Files.readAllBytes(path));

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + path.getFileName().toString() + "\"")
                .body(resource);
    }
}

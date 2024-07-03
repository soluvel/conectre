package com.soluvel.conectre.service;

import com.soluvel.conectre.domain.Ambiente;
import com.soluvel.conectre.domain.Medicao;
import com.soluvel.conectre.domain.Peixe;
import com.soluvel.conectre.domain.Racao;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ExcelService {
    public byte[] generateExcel(List<Medicao> dataList) throws IOException {
        Workbook workbook = new XSSFWorkbook();

        Sheet peixeSheet = workbook.createSheet("Peixe");
        Sheet ambienteSheet = workbook.createSheet("Ambiente");
        Sheet racaoSheet = workbook.createSheet("Ração");

        createHeaderRow(peixeSheet, new String[]{"ID", "Data Coleta", "Hora Coleta", "Quantidade Amostra", "Volume", "Mortalidade", "Peso Médio", "Biomassa", "Ganho de Peso", "KG Ração Ofertada"});
        createHeaderRow(ambienteSheet, new String[]{"ID", "Data Coleta", "Hora Coleta", "pH", "Amônia", "Nitrito", "Alcalinidade", "Transparência da Água", "Temperatura", "Oxigênio"});
        createHeaderRow(racaoSheet, new String[]{"ID", "Data Coleta", "Hora Coleta", "Temperatura", "Oxigênio", "Ração Trato", "Ração Total"});

        int peixeRowNum = 1;
        int ambienteRowNum = 1;
        int racaoRowNum = 1;

        for (Medicao data : dataList) {
            addPeixeRow(peixeSheet, peixeRowNum++, data.getPeixe());
            addAmbienteRow(ambienteSheet, ambienteRowNum++, data.getAmbiente());
            addRacaoRow(racaoSheet, racaoRowNum++, data.getRacao());
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream.toByteArray();
    }

    private void createHeaderRow(Sheet sheet, String[] headers) {
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
        }
    }

    private void addPeixeRow(Sheet sheet, int rowNum, Peixe peixe) {
        Row row = sheet.createRow(rowNum);
        row.createCell(0).setCellValue(peixe.getId());
        row.createCell(1).setCellValue(peixe.getDtColeta());
        row.createCell(2).setCellValue(LocalDateTime.from(peixe.getHrColeta()));
    }

    private void addAmbienteRow(Sheet sheet, int rowNum, Ambiente ambiente) {
        Row row = sheet.createRow(rowNum);
        row.createCell(0).setCellValue(ambiente.getId());
        row.createCell(1).setCellValue(ambiente.getDtColeta());
        row.createCell(2).setCellValue(LocalDateTime.from(ambiente.getHrColeta()));
    }

    private void addRacaoRow(Sheet sheet, int rowNum, Racao racao) {
        Row row = sheet.createRow(rowNum);
        row.createCell(0).setCellValue(racao.getId());
        row.createCell(1).setCellValue(racao.getDtColeta());
    }
}


package com.soluvel.conectre.controller;

import com.soluvel.conectre.domain.EnumValue;
import com.soluvel.conectre.service.EnumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/enum")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EnumController {

    @GetMapping("/{enumValue}")
    public ResponseEntity<List<EnumValue>> getEnumValuesAndDescriptions(@PathVariable("enumValue") String enumValue) {
        return ResponseEntity.ok(EnumService.getEnumValuesAndDescriptions(enumValue));
    }
}

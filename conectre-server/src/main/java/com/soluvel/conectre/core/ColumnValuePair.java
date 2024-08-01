package com.soluvel.conectre.core;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ColumnValuePair {
    private final String column;
    private final String value;
}

package com.thao.qlts.project.dto;

import lombok.Data;

@Data
public class ChartDto {
    private String month;
    private Long sumService=0L;
    private Long sumbook=0L;
    private Long sum=0L;
}

package com.thao.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppParamDTO {
    private Long id;

    private String code;

    private String name;

    private String type;

    private Integer isActive;
}

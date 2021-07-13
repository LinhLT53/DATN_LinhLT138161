package com.linhlt138161.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class GroupPermissionDTO extends AuditingDTO<String>{
    private Long id;

    private String code;

    private String name;

    private String note;

    private String status;

    private int state;
}

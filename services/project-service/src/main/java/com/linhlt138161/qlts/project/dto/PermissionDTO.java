package com.linhlt138161.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class PermissionDTO extends AuditingDTO<String>{
    private Long permissionId;

    private String code;

    private String name;

    private Integer level;

    private Long parentId;

    private String description;

    private String pathId;

    private Integer isActive;
}

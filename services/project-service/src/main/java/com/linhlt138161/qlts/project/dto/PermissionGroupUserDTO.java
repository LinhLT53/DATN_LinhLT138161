package com.thao.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class PermissionGroupUserDTO extends AuditingDTO{
    private Long id;

    private Long groupUserId;

    private Long permissionId;

    private Integer isActive;

}

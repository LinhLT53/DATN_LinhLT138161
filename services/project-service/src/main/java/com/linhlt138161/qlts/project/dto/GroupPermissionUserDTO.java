package com.linhlt138161.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class GroupPermissionUserDTO {
    private Long id;

    private Long groupPermissionId;

    private Long userId;

    private int status;
}

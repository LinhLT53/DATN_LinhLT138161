package com.thao.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class GroupUserDTO extends AuditingDTO<String>{
    private Long groupUserId;

    private String code;

    private String name;

    private Long description;

    private Integer isActive;
}

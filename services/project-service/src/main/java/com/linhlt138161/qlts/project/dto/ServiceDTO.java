package com.linhlt138161.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class ServiceDTO extends AuditingDTO<String>{
    private Long serviceId;

    private String servicecode;

    private String servicename;

    private Double price;

    private String unit;

    private String note;
    private Integer page;
    private Integer status;
    private Integer pageSize;

    private Long totalRecord;
    private Long departmentId;
    private String tyleDto;
    private Integer quantity;
    private Double total;
}

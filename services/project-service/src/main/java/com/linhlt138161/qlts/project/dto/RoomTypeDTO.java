package com.thao.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class RoomTypeDTO extends AuditingDTO<String>{
    private Long roomTypeId;
    private String code;
    private String name;
    private Long dayPrice;
    private Long nightPrice;
    private String note;
    private Long hourPrice;
    private Integer status;
    private Integer page;
    private Integer pageSize;
    private Long totalRecord;
    private Long departmentId;
    private String tyleDto;
    private Long price;
}

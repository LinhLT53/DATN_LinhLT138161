package com.linhlt138161.qlts.project.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceDutyDTO {

    private Long id;
    private Date date;
    private Date startDateTime;
    private Date endDateTime;
    private Date acTualStartDateTime;
    private Date acTualEndDateTime;
    private Long staffID;
    private Long roomID;
    private Integer status;
    private String note;
    private String servicecode;
    private String roomName;
    private String fullName;

    private Integer page;
    private Integer pageSize;

    private Long totalRecord;
    private Long departmentId;
    private String tyleDto;
    private Integer quantity;
    private Double total;
}

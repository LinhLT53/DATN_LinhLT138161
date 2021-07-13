package com.thao.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class RoomServiceDTO extends AuditingDTO<String>{
    private Long roomserviceId;

    private Long bookingroomId;

    private Long serviceId;

    private Double price;

    private String serviceName;

    private Integer amount;

    private Integer status;

    private Timestamp usedTime;
}

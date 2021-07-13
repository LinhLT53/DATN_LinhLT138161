package com.thao.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class DiscountPromotionDTO extends AuditingDTO<String>{

    private Long discountPromotionId;

    private String code;

    private Integer status;

    private Date startDate;

    private Long endDate;
}

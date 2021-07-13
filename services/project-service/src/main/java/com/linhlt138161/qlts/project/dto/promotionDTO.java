package com.thao.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class promotionDTO {
    private Long promotionId;

    private String promotionCode;

    private String promotionName;

    private Date startDate;

    private Date endDate;

    private Integer percentPromotion;

    private List<Long> roomTypeID;

    private Long roomTypeIDSearch;
    private String roomNameType;
    private String note;

    private Integer page;

    private Integer status;

    private Integer pageSize;

    private Long totalRecord;

    private String tyleDto;



}
package com.linhlt138161.qlts.project.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TimeBookDTO {
    private Long idRoom;
    private Long idBookRoom;
    private Date start;
    private Date end;
    private Long dayPrice;
    private Long nightPrice;
    private String note;
    private Long hourPrice;
    private Double unit;

    private String nameType;
    private String nameRoom;
    private Integer typeBook;

    private String nameTypeBook;
}

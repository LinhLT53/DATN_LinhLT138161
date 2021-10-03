package com.linhlt138161.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class BookingRoomDTO extends AuditingDTO<String>{
    private Long bookingroomId;
    private Long customerId;
    private Long EmployeeId;
    private Date bookingDate;
    private Date bookingDateOut;
    private Date bookingCheckin;
    private Date bookingCheckout;
    private Double advanceAmount;
    private Long oldRoomCode;
    private Integer status;
    private Long roomId;
    private Integer bookingType;
    private String promotionCode;
    private String customerName;
    private String roomName;
    private String roomTypeName;
    private String statusName;
    private String comein_timeshow;
    private String comeout_timeshow;
    private String floorName;
    private List<BookingRoomServiceDTO> listService;
    private Integer page;
    private Integer pageSize;
    private Long totalRecord;
    private String bookType;
    private Long price;
    private Integer totalDate;
    private Long priceBooking;
    private Double priceTotal;
    private String note;
    private String oldBookRoom;
    private String noteAddition;
    private Double priceService;


    private List<BookingRoomServiceDTO> listServiceOld;

}

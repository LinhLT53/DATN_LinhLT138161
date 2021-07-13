package com.thao.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "pay_booking_room")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PayEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "id_book_room")
    private Long idBookingRoom;
    //tổng nhận
    @Column(name = "sum_book")
    private Long sumBookRoom;

    @Column(name = "id_discount")
    private Long idDiscount;

    //tiền thối
    @Column(name = "pay_chang")
    private Long payChang;

    //tiền ứng tước
    @Column(name = "advance_many")
    private Long advanceManey;

    @Column(name = "date_pay")
    private Date datePay;

    @Column(name = "pay_service")
    private Long payService;

    @Column(name = "pay_book")
    private Long payBook;

}

package com.thao.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "booking_room")
@AllArgsConstructor
@NoArgsConstructor
public class BookingRoomEntity extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_room_id")
    private Long bookingroomId;

    @Column(name = "custormer_id")
    private Long customerId;

    @Column(name = "employee_id")
    private Long EmployeeId;

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "booking_date")
    private Date bookingDate;

    @Column(name = "booking_date_out")
    private Date bookingDateOut;

    @Column(name = "booking_checkin")
    private Date bookingCheckin;

    @Column(name = "booking_checkout")
    private Date bookingCheckout;

    @Column(name = "advance_amount")
    private Long advanceAmount;

    @Column(name = "old_room_code")
    private Long oldRoomCode;

    @Column(name = "old_book_room")
    private String oldBookRoom;

    @Column(name = "status")
    private Integer status;

    @Column(name = "booking_type")
    private Integer bookingType;

    @Column(name = "note")
    private String note;
}

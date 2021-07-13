package com.linhlt138161.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "booking_room_service")
@AllArgsConstructor
@NoArgsConstructor
public class BookingRoomServiceEntity extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long bookingroomServiceId;

    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "service_id")
    private Long serviceId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "total")
    private Long total;


    @Column(name = "price")
    private Long price;
}

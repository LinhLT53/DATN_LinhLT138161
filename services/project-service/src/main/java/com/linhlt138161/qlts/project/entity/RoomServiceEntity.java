package com.linhlt138161.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "room_service")
@AllArgsConstructor
@NoArgsConstructor
public class RoomServiceEntity extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_service_id")
    private Long roomserviceId;

    @Column(name = "booking_room_id")
    private Long bookingroomId;

    @Column(name = "service_id")
    private Long serviceId;

    @Column(name = "price")
    private Double price;

    @Column(name = "service_name")
    private String serviceName;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "status")
    private Integer status;

    @Column(name = "used_time")
    private Timestamp usedTime;

    @Column(name = "note")
    @Type(type="text")
    private String note;
}

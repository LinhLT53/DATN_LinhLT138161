package com.thao.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name ="room_type")
@AllArgsConstructor
@NoArgsConstructor
public class RoomTypeEntity extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_type_id")
    private Long roomTypeId;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "day_price")
    private Long dayPrice;

    @Column(name = "night_price")
    private Long nightPrice;

    @Column(name = "hour_price")
    private Long hourPrice;

    @Column(name = "status")
    private Integer status;

    @Column(name = "note")
    private String note;
}

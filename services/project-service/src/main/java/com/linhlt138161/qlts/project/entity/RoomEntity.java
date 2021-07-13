package com.thao.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "room")
@AllArgsConstructor
@NoArgsConstructor
public class RoomEntity extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "max_number")
    private Integer maxNumber;

    @Column(name = "floor_number")
    private Integer floorNumber;

    @Column(name = "room_code")
    private String roomCode;

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "status")
    private Integer status;

    @Column(name = "room_type")
    private Integer roomType;

    @Column(name = "note")
    private String note;

    //verson
}

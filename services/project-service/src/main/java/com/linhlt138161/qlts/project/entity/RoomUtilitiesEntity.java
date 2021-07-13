package com.linhlt138161.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name ="room_utilities")
@AllArgsConstructor
@NoArgsConstructor
public class RoomUtilitiesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long room_id;

    @Column(name = "id_utilities")
    private String id_utilities;
}

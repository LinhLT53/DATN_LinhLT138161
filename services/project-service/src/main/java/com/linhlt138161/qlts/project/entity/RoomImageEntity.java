package com.linhlt138161.qlts.project.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "room_image")
@AllArgsConstructor
@NoArgsConstructor
public class RoomImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "image_url")
    private String roomCode;

}

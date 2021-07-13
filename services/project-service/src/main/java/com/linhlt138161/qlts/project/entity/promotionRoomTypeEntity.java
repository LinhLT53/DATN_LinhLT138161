package com.linhlt138161.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name ="promotion_roomType")
@AllArgsConstructor
@NoArgsConstructor
public class promotionRoomTypeEntity  extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "promotion_roomType_id")
    private Long assetRoomId;

    @Column(name = "promotion_id")
    private Long promotionid;

    @Column(name = "roomType_id")
    private Long roomTypeid;

    @Column(name = "is_active")
    private Integer isActive;
}

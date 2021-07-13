package com.linhlt138161.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "asset")
@AllArgsConstructor
@NoArgsConstructor
public class AssetEntity extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "asset_name")
    private String assetname;

    @Column(name = "note")
    private String note;

    @Column(name = "image")
    private String image;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "room_id")
    private Integer room_id;

    @Column(name = "status")
    private Integer status;


}

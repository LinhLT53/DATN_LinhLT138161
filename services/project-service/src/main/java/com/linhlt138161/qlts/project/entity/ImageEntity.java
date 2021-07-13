package com.linhlt138161.qlts.project.entity;

import javax.persistence.*;


@Entity
@Table(name = "image")


public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "permission_id")
    private Long permissionId;

}

package com.linhlt138161.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name ="tour")
@AllArgsConstructor
@NoArgsConstructor
public class TourEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tour")
    private Long idtour;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private String code;

    @Column(name = "vehicle")
    private String vehicle;

    @Column(name = "tour_type")
    private String tourtype;

    @Column(name = "starttime")
    private Date starttime;

    @Column(name = "endtime")
    private Date endtime;

    @Column(name = "price")
    private Integer price;

    @Column(name = "status")
    private Integer status;


    @Column(name = "service")
    private String service;

    @Column(name = "policy")
    private String policy;

    @Column(name = "image")
    private String image;

    @Column (name = "note")
    private String note;

    @Column(name = "venue")
     private  String venue;


}

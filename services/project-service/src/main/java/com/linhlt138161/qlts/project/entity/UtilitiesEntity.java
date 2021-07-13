package com.linhlt138161.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name ="utilities")
@AllArgsConstructor
@NoArgsConstructor
public class UtilitiesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "utilities_id")
    private Long utilities_id;

    @Column(name = "utilities_code")
    private String utilities_code;

    @Column(name = "utilities_name")
    private String utilities_name;

    @Column(name = "icon_url")
    private String icon_url;

    @Column(name = "status")
    private Double status;
}

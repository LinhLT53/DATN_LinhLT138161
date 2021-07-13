package com.linhlt138161.qlts.project.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "login")
@AllArgsConstructor
@NoArgsConstructor
public class LoginEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "email")
    private String email;

    @Column(name = "time")
    private Long time;

    @Column(name = "requetfail")
    private Integer requetFail;

    @Column(name = "id_hummer")
    private Long hummerId;

    @Version
    private Long version;
}

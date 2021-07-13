package com.linhlt138161.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name ="staff ")
@AllArgsConstructor
@NoArgsConstructor
public class StaffEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_staff")
    private Long idstaff;

    @Column(name = "Staff_name")
    private String Staffname;

    @Column(name = "position")
    private String position;

    @Column(name = "status")
    private String status;

    @Column(name = "email")
    private String email;

    @Column(name = "note")
    private String note;

    @Column(name = "phone")
    private Integer phone;
}


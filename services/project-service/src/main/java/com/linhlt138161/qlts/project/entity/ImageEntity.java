package com.linhlt138161.qlts.project.entity;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "image")

public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "PATH")
    private String name;

    @Column(name = "ID_CODE")
    private Long idCode;

    @Column(name = "TYLE")
    private Integer tyle;

    @Column(name = "DATEADD")
    private Date dateAdd;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getIdCode() {
        return idCode;
    }

    public void setIdCode(Long idCode) {
        this.idCode = idCode;
    }

    public Integer getTyle() {
        return tyle;
    }

    public void setTyle(Integer tyle) {
        this.tyle = tyle;
    }

    public Date getDateAdd() {
        return dateAdd;
    }

    public void setDateAdd(Date dateAdd) {
        this.dateAdd = dateAdd;
    }
}

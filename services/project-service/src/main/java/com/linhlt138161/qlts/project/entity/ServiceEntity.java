package com.linhlt138161.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.DateTime;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name ="service")
@AllArgsConstructor
@NoArgsConstructor
public class ServiceEntity extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    private Long serviceId;

    @Column(name = "service_code")
    private String servicecode;

    @Column(name = "service_name")
    private String servicename;

    @Column(name = "description")
    private String description;

    @Column(name = "start_date")
    private Date startdate;

    @Column(name = "end_date")
    private Date enddate;


    @Column(name = "price")
    private Double price;

    @Column(name = "unit")
    private String unit;

    @Column(name = "note")
    private String note;

    @Column(name = "status")
    private Integer status;
}

package com.linhlt138161.qlts.project.entity;
import lombok.AllArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.xmlbeans.GDate;
import org.joda.time.DateTime;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name ="Service_duty")
@AllArgsConstructor
@NoArgsConstructor
public class ServiceDutyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "service_code")
    private String servicecode;

    @Column(name = "date")
    private Date date;

    @Column(name = "start_time")
    private Date ttarttime;

    @Column(name = "end_time")
    private Date endtime;

    @Column(name = "actual start_time")
    private Date actualstarttime;

    @Column(name = "actual end_time")
    private Date actualendttime;

    @Column(name = "id_staff")
    private Long idstaff;

    @Column(name = "id_room")
    private Long idroom;

    @Column(name = "status")
    private Integer Status;

    @Column(name = "note")
    private String note;

}

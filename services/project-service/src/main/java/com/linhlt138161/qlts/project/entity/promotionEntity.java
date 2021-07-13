package com.thao.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "promotion")
@AllArgsConstructor
@NoArgsConstructor
public class promotionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "promotion_id")
    private Long promotionId;

    @Column(name = "promotion_code")
    private String promotionCode;

    @Column(name = "promotion_name")
    private String promotionName;

    @Column(name = "start_Date")
    private Date startDate;

    @Column(name = "end_Date")
    private Date endDate;

    @Column(name = "percent_Promotion")
    private Integer percentPromotion;

    @Column(name = "status")
    private Integer status;

    @Column(name = "room_type_ID")
    private Long roomTypeID;

    @Column(name = "note")
    private String note;
}

package com.linhlt138161.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name ="discount_promotion")
@AllArgsConstructor
@NoArgsConstructor
public class DiscountPromotionEntity extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discount_promotion_id")
    private Long discountPromotionId;

    @Column(name = "code")
    private String code;

    @Column(name = "status")
    private Integer status;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Long endDate;
}

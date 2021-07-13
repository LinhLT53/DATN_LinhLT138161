package com.thao.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name ="app_params")
@AllArgsConstructor
@NoArgsConstructor
public class AppParamEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "app_params_id")
    private Long id;

    @Column(name="par_code")
    private String code;

    @Column(name="par_name")
    private String name;

    @Column(name="par_type")
    private String type;

    @Column(name = "is_active")
    private Integer isActive;
}

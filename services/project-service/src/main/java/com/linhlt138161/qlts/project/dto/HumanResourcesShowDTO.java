package com.thao.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HumanResourcesShowDTO {

    private BigInteger humanResourceId;

    private String code;

    private String name;

    private String username;

    private String parcode;

    private Integer active;

    private String position;

    private Integer positionId;

    private Integer status;

    private String email;

    private String note;

    private Integer page;

    private Integer pageSize;

    private Long totalRecord;

    private Long departmentId;

    private String password;

    private String statuss;

    private String cmt;

    private String contract_code;

    private String tax_code;

    private String address;

    private String phone;
}

package com.linhlt138161.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO extends AuditingDTO<String>{
    private Long employeeId;

    private String fullname;

    private String code;

    private String cmt;

    private String contract_number;

    private String tax_code;

    private String phone_number;

    private String email;

    private String password;

    private Date birthday;

    private String position;

    private String address;
}

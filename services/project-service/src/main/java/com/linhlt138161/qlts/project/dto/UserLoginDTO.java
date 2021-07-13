package com.thao.qlts.project.dto;

import lombok.Data;


@Data
public class UserLoginDTO {
    private String email;
    private String password;
    private String recaptchare;
}

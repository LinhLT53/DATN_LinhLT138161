package com.linhlt138161.qlts.project.dto;

import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HumanResourcesDTO {
    private Long humanResourceId;
    private String code;
    private String fullName;
    private String email;
    private Long departmentId;
    private Long positionId;
    private Integer status;
    private String note;
    private Date createDate;
    private Long createBy;
    private Date updateDate;
    private Long updateBy;
    private String username;
    private String password;
    private Integer isNew;
    private String verifyKey;
    private String newPassword;
    private String newPasswordConfirm;
    private List<String> lstPermission;
    private String role;
    private Double resourcesUsed;
    private String cmt;
    private String address;
    private String phone;
    private Date dateOfBirth;
    private String contractCode;
    private String taxCode;
    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

}

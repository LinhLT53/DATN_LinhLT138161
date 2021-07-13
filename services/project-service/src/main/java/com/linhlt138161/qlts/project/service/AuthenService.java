package com.linhlt138161.qlts.project.service;

import com.linhlt138161.qlts.project.common.exception.CapchaException;
import com.linhlt138161.qlts.project.dto.UserLoginDTO;
import common.ObjectError;

import javax.security.auth.login.LoginException;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface AuthenService {
    String login(UserLoginDTO userLoginDTO) throws CapchaException, LoginException;

    String register(UserLoginDTO userLoginDTO);

    ObjectError forgotPassword(String email);

    String getEmailCurrentlyLogged(HttpServletRequest request);

    Long getIdHummer(HttpServletRequest request);

    Map<String,Object> getRole(HttpServletRequest request);
}

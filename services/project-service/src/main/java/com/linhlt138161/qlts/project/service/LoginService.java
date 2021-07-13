package com.linhlt138161.qlts.project.service;

import com.linhlt138161.qlts.project.entity.LoginEntity;

public interface  LoginService {
    LoginEntity getUser(String email);
    LoginEntity getUserById(Long id);
    void save(LoginEntity entity);
    void saveAddFail(LoginEntity entity);
    void saveSucc(LoginEntity entity);
    void  saveFailFirst(String email);
}

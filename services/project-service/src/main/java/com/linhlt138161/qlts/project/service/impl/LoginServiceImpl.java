package com.thao.qlts.project.service.impl;

import com.thao.qlts.project.entity.LoginEntity;
import com.thao.qlts.project.repository.jparepository.LoginRepository;
import com.thao.qlts.project.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private LoginRepository loginRepository;
    @Override
    public LoginEntity getUser(String email) {
        if(!loginRepository.findByEmail(email).isPresent()){
            return null;
        }
        return loginRepository.findByEmail(email).get();
    }

    @Override
    public LoginEntity getUserById(Long id) {

        if(!loginRepository.findByHummerId(id).isPresent()){
            return null;
        }
        return loginRepository.findByHummerId(id).get();
    }

    @Override
    public void save(LoginEntity entity) {

    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveAddFail(LoginEntity entity) {
        if(entity.getRequetFail()==3){
            entity.setRequetFail(1);
        }else {
            int c=entity.getRequetFail();
            entity.setRequetFail(c+1);
        }

            entity.setTime(new Date().getTime());
            loginRepository.save(entity);
    }

    @Override
    public void saveSucc(LoginEntity entity) {
        entity.setTime(0L);
        entity.setRequetFail(0);
        loginRepository.save(entity);
    }

    @Override
    public void saveFailFirst(String email) {
        LoginEntity loginEntity=new LoginEntity();
        loginEntity.setEmail(email);
        loginEntity.setRequetFail(1);
        loginEntity.setTime(new Date().getTime());
        loginRepository.save(loginEntity);
    }

}

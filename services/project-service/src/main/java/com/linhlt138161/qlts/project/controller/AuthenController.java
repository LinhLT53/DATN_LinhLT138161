package com.thao.qlts.project.controller;

import com.thao.qlts.project.common.exception.CapchaException;
import com.thao.qlts.project.config.security.JWTProvider;
import com.thao.qlts.project.dto.HumanResourcesDTO;
import com.thao.qlts.project.dto.UserLoginDTO;
import com.thao.qlts.project.entity.HumanResourcesEntity;
import com.thao.qlts.project.repository.jparepository.HumanResourcesRepository;
import com.thao.qlts.project.service.AuthenService;
import com.thao.qlts.project.service.HumanResourcesService;
import common.ErrorCode;
import common.ResultResp;
import exception.CustomExceptionHandler;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.LoginException;

@RestController
@RequestMapping("/authen")
@CrossOrigin(origins = "*")
public class AuthenController {
    private Logger log = LogManager.getLogger(AuthenController.class);
    @Autowired
    AuthenService authenService;

    @Autowired
    HumanResourcesService humanResourcesService;

    @Autowired
    HumanResourcesRepository humanResourcesRepository;

    @Autowired
    private JWTProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO userLoginDTO) {
        try {String token = authenService.login(userLoginDTO);
            return ResultResp.success(token);
        }catch (LoginException e){
             return new ResponseEntity<>(HttpStatus.FOUND);
        }catch (CapchaException e){
            return ResultResp.badRequest(ErrorCode.CAPCHA_FAILED);
        } catch (Exception e) {
            return ResultResp.badRequest(ErrorCode.AUTHENTICATION_FAILED);
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UserLoginDTO userLoginDTO) {
        return ResponseEntity.ok(authenService.register(userLoginDTO));
    }






    @GetMapping("/test")
    public ResponseEntity test() {
        User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(userDetails.getAuthorities());
    }

    @PostMapping("/forgot-password")
    public ResultResp forgotPassword(@RequestBody HumanResourcesDTO dto) {
        if (null == dto.getEmail()) {
            return ResultResp.badRequest(ErrorCode.EMAIL_NULL);
        }
        try {
            return ResultResp.success(authenService.forgotPassword(dto.getEmail()));
        } catch (CustomExceptionHandler ex) {
            log.error("Forgot Password");
            log.error(ex);
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }
    }

    @GetMapping("/verify-email-forgot-password")
    public ResultResp verifyEmailForgotPassword(@RequestParam("email") String email,
                                                @RequestParam("key") String key) {
            log.info("Start verify ");
        if (null == email) {
            return ResultResp.badRequest(ErrorCode.EMAIL_NULL);
        }
        HumanResourcesEntity entity = humanResourcesRepository.findByEmail2(email);
        if(key.equals(entity.getVerifyKey())){
            String username = entity.getUsername();
            ResultResp rs = humanResourcesService.resetPassword(entity.getHumanResourceId(),username);
            if(rs.getStatusCode() == HttpStatus.OK){
                entity.setVerifyKey("");
                humanResourcesRepository.save(entity);
            }
            return rs;
        }
        return ResultResp.badRequest(ErrorCode.VERIFY_KEY_NOT_FOUND);
    }
}

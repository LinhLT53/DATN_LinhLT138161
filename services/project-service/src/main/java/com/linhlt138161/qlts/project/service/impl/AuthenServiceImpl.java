package com.linhlt138161.qlts.project.service.impl;

import com.linhlt138161.qlts.project.common.exception.CapchaException;
import com.linhlt138161.qlts.project.config.security.JWTConstants;
import com.linhlt138161.qlts.project.config.security.JWTProvider;
import com.linhlt138161.qlts.project.entity.HumanResourcesEntity;
import com.linhlt138161.qlts.project.entity.LoginEntity;
import com.linhlt138161.qlts.project.repository.jparepository.HumanResourcesRepository;
import com.linhlt138161.qlts.project.service.AuthenService;
import com.linhlt138161.qlts.project.dto.UserLoginDTO;
import com.linhlt138161.qlts.project.service.LoginService;
import common.Constants;
import common.ErrorCode;
import common.ObjectError;
import exception.CustomExceptionHandler;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.security.auth.login.LoginException;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;
import java.util.UUID;


@Service
public class AuthenServiceImpl implements AuthenService {
    private final Logger log = LogManager.getLogger(AuthenServiceImpl.class);

    @Autowired
    private CaptchaService captchaService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTProvider jwtProvider;

    @Autowired
    private HumanResourcesRepository resourcesRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private HumanResourcesRepository humanResourcesRepository;
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${urlForgotPassword}")
    private String urlForgotPassword;

    @Autowired
    private LoginService loginService;

    @Override
    public String login(UserLoginDTO userLoginDTO) throws CapchaException, LoginException {
//        boolean captchaVerified = captchaService.verify(userLoginDTO.getRecaptchare());
//        if (!captchaVerified) {
//            throw new CapchaException("exx");
//        }
        LoginEntity entity = loginService.getUser(userLoginDTO.getEmail());
//        if (entity != null) {
//            if (entity.getRequetFail() == 3 & (entity.getTime() + 600000 > new Date().getTime())) {
//                throw new LoginException("exx");
//            }
//        }

        try {
            UsernamePasswordAuthenticationToken upToken = new UsernamePasswordAuthenticationToken(userLoginDTO.getEmail(), userLoginDTO.getPassword());
            Authentication authentication = authenticationManager.authenticate(upToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            HumanResourcesEntity humanResourcesEntity = resourcesRepository.findByEmail2(userLoginDTO.getEmail());
            loginService.saveSucc(entity);
            return jwtProvider.generateToken(humanResourcesEntity);
        } catch (Exception e) {
            if(entity==null){
                loginService.saveFailFirst(userLoginDTO.getEmail());
            }else {
                loginService.saveAddFail(entity);
            }

            e.printStackTrace();
            throw e;
        }

    }

    @Override
    public String register(UserLoginDTO userLoginDTO) {
        HumanResourcesEntity resourcesEntity = new HumanResourcesEntity();
        resourcesEntity.setEmail(userLoginDTO.getEmail());
        resourcesEntity.setPassword(passwordEncoder.encode(userLoginDTO.getPassword()));
        resourcesEntity.setFullName("test");

        resourcesRepository.save(resourcesEntity);

        return jwtProvider.generateToken(resourcesEntity);
    }

    @Override
    public ObjectError forgotPassword(String email) {
        HumanResourcesEntity en = humanResourcesRepository.findByEmail2(email);
        if (null == en) {
            throw new CustomExceptionHandler(Constants.EMAIL_NOT_FOUND, HttpStatus.BAD_REQUEST, ErrorCode.EMAIL_NOT_FOUND);
        }
        try {
            String key = UUID.randomUUID().toString();
            en.setVerifyKey(key);
            humanResourcesRepository.save(en);
            MimeMessage message = javaMailSender.createMimeMessage();
            message.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
            message.setSubject("THÔNG TIN TÀI KHOẢN HỆ THỐNG QUẢN LÝ TÀI SẢN", "UTF-8");
            String subject = "Kính gửi anh/chị,\n\n" +
                    "Hệ thống Quản lý dự án của ***** gửi đến anh chị thông tin như sau:\n" +
                    "Anh/chị click link phía dưới để nhận mật khẩu mới:\n" +
                    "Link truy cập hệ thống:" + urlForgotPassword + email + "/" + key + "\n" +
                    "Họ và tên: " + en.getFullName() + "\n" +
                    "Tên đăng nhập: " + en.getEmail() + "\n" +
                    "Trân trọng!";
            message.setText(subject, "UTF-8");
            javaMailSender.send(message);
            log.info("<--- Send email success!");
            return ErrorCode.RESET_PASSWORD_OK;
        } catch (MessagingException | MailException ex) {
            log.error("Send email notification fail by Error ", ex.getMessage());
            throw new CustomExceptionHandler(Constants.RESET_PASSWORD_FAIL, HttpStatus.BAD_REQUEST, ErrorCode.RESET_PASSWORD_FAIL);
        }
    }

    @Override
    public String getEmailCurrentlyLogged(HttpServletRequest request) {
        String header = request.getHeader(JWTConstants.HEADER_STRING);
        return jwtProvider.getEmailFromHeaders(header);
    }

    @Override
    public Long getIdHummer(HttpServletRequest request) {
        String header = request.getHeader(JWTConstants.HEADER_STRING);
        return jwtProvider.getIdHummer(header);
    }

    @Override
    public Map<String, Object> getRole(HttpServletRequest request) {
        String header = request.getHeader(JWTConstants.HEADER_STRING);
        return jwtProvider.getListDataToken(header);
    }

}

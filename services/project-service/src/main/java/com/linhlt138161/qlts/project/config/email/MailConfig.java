//package com.hust.qlts.project.config.email;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.JavaMailSenderImpl;
//import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;
//
//import java.util.Properties;
//
///**
// * @author dangnp
// * @created 24/07/2020 - 11:00 AM
// * @project services
// **/
//@Configuration
//public class MailConfig {
//    @Bean
//    public JavaMailSender getMailSender() {
//        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//
//        mailSender.setHost("smtp.gmail.com");
//        mailSender.setPort(587);
//        mailSender.setUsername("buithekhang246@gmail.com");
//        mailSender.setPassword("Khang240697");
////
//        Properties javaMailProperties = new Properties();
//        javaMailProperties.put("mail.smtp.starttls.enable", "true");
//        javaMailProperties.put("mail.smtp.auth", "true");
//        javaMailProperties.put("mail.transport.protocol", "smtp");
//        javaMailProperties.put("mail.debug", "true");
//
//        mailSender.setJavaMailProperties(javaMailProperties);
//        return mailSender;
//    }
////
////    @Bean
////    public FreeMarkerConfigurationFactoryBean getFreeMarkerConfiguration() {
////        FreeMarkerConfigurationFactoryBean fmConfigFactoryBean = new FreeMarkerConfigurationFactoryBean();
////        fmConfigFactoryBean.setTemplateLoaderPath("/templates/");
////        return fmConfigFactoryBean;
////    }
//}

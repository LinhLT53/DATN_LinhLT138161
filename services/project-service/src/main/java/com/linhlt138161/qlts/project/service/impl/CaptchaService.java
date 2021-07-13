package com.linhlt138161.qlts.project.service.impl;

import com.linhlt138161.qlts.project.dto.respone.RecaptchaResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class CaptchaService {

    private final RestTemplate restTemplate;

    public CaptchaService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @Value("${google.recaptcha.secret.key}")
    public String recaptchaSecret;
    @Value("${google.recaptcha.verify.url}")
    public String recaptchaVerifyUrl;

    public boolean verify(String response) {
        MultiValueMap<String, String> param= new LinkedMultiValueMap<>();
        param.add("secret", recaptchaSecret);
        param.add("response", response);
        StringBuffer buffer=new StringBuffer();
        buffer.append(recaptchaVerifyUrl);
        buffer.append("?secret="+recaptchaSecret);
        buffer.append("&response="+response);
        RecaptchaResponse recaptchaResponse = null;
        try {
            ResponseEntity<RecaptchaResponse> futureResponse = restTemplate.exchange(buffer.toString(), HttpMethod.POST,null, RecaptchaResponse.class);
            recaptchaResponse=futureResponse.getBody();

        }catch(RestClientException e){
            System.out.print(e.getMessage());
            return false;
        }
        if(recaptchaResponse.isSuccess()){
            return true;
        }else {
            return false;
        }
    }
}

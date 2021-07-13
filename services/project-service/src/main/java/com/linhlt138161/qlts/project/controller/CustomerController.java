package com.linhlt138161.qlts.project.controller;

import com.linhlt138161.qlts.project.dto.CustomerDTO;
import com.linhlt138161.qlts.project.service.CustomerService;
import common.ErrorCode;
import common.ResultResp;
import exception.CustomExceptionHandler;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin("*")
public class CustomerController {
    private final Logger log = LogManager.getLogger(roomController.class);
    @Autowired
    private CustomerService customerService;

    @GetMapping("/get-all-customer")
    private ResultResp getAllCustomer(){
        log.info("get all customer");
        try {
            return ResultResp.success(ErrorCode.CREATED_HR_OK, customerService.getAllCustomer());
        } catch (Exception e) {
            log.error("<--- api find AssetResources: error, ");
            e.printStackTrace();
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }
    }

    @PostMapping("/getAllCustomer")
    private ResponseEntity<List<CustomerDTO>> searchCustomer(@RequestBody CustomerDTO dto){
        try {
            return new ResponseEntity(customerService.searchCustomer(dto), HttpStatus.OK);
        }catch (Exception e){
            throw  e;
        }
    }
    @PostMapping("/add")
    public ResultResp createHR(@RequestBody CustomerDTO dto, HttpServletRequest request) {
        log.info("----------------api Customer-----------------");
        try {
            return ResultResp.success(ErrorCode.CREATED_HR_OK, customerService.create(dto));
        } catch (CustomExceptionHandler e) {
            if (e.getMsgCode().equalsIgnoreCase(ErrorCode.CREATED_HR_EXIST.getCode()))
                return ResultResp.badRequest(ErrorCode.CREATED_HR_EXIST);
        }
        return ResultResp.badRequest(ErrorCode.CREATED_HR_FALSE);
    }

    @GetMapping("/getCustomerById/{id}")
    public ResultResp getOneById(@PathVariable("id") Long id) {
        log.info("<-- api updateRoom: start, ", id);
        try {
            return ResultResp.success(customerService.findById(id));

        } catch (CustomExceptionHandler e) {
            return ResultResp.badRequest(ErrorCode.USERNAME_NOT_FOUND);
        } catch (Exception e) {
            log.error("<--- api find AssetResources: error, ");
            e.printStackTrace();
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }
    }
    @GetMapping("/deleteCustomer/{id}")
    public ResultResp deleteProject(@PathVariable("id") Long id,HttpServletRequest request) {
        log.info("----------------api delete khach hang -----------------");
        try {
            return ResultResp.success(customerService.delete(id));
        } catch (CustomExceptionHandler e) {
            log.info("----------------api delete  khach hang faile-----------------");
            return ResultResp.badRequest(ErrorCode.DELETE_HR_FAIL);
        }
    }
}

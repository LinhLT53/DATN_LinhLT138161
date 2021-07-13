package com.linhlt138161.qlts.project.controller;



import com.linhlt138161.qlts.project.dto.AssetDTO;
import com.linhlt138161.qlts.project.service.AssetService;
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
@RequestMapping("/asset")
@CrossOrigin("*")
public class AssetControler {
    private final Logger log = LogManager.getLogger(AssetControler.class);

    @Autowired
    AssetService assetService;

    @PostMapping ("/searchAseet")
    public ResponseEntity<List<AssetDTO>> searchAseer(@RequestBody AssetDTO assetDTO){
        log.info("----------------api searchAsser-----------------");
        try {
            log.info("----------------api searchAsser Ok-----------------");

            return new ResponseEntity(assetService.searchAsser(assetDTO), HttpStatus.OK);

        }catch (Exception e){
            log.info("----------------api searchAsser thất bại-----------------");

            throw  e;
        }
    }
    @PostMapping("/add")
    public ResultResp createHR(@RequestBody AssetDTO partnerDTO, HttpServletRequest request) {
        log.info("----------------api searchAsset-----------------");
        try {
            return ResultResp.success(ErrorCode.CREATED_HR_OK, assetService.create(partnerDTO));
        } catch (CustomExceptionHandler e) {
            if (e.getMsgCode().equalsIgnoreCase(ErrorCode.CREATED_HR_EXIST.getCode()))
                return ResultResp.badRequest(ErrorCode.CREATED_HR_EXIST);
        }
        return ResultResp.badRequest(ErrorCode.CREATED_HR_FALSE);
    }

    @GetMapping("/get-asset-by-id/{id}")
    public ResultResp getOneById(@PathVariable("id") Long id) {
        log.info("<-- api updateAsset: start, ", id);
        try {
            return ResultResp.success(assetService.findById(id));

        } catch (CustomExceptionHandler e) {
            return ResultResp.badRequest(ErrorCode.USERNAME_NOT_FOUND);
        } catch (Exception e) {
            log.error("<--- api find AssetResources: error, ");
            e.printStackTrace();
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }

    }
    @GetMapping("/deleteAsset/{id}")
    public ResultResp deleteProject(@PathVariable("id") Long id,HttpServletRequest request) {
        log.info("----------------api delete nhan su-----------------");
        try {
            return ResultResp.success(assetService.delete(id));

        } catch (CustomExceptionHandler e) {
            log.info("----------------api delete nhan su faile-----------------");
            return ResultResp.badRequest(ErrorCode.DELETE_HR_FAIL);
        }
    }
    @GetMapping("/get-asset")
    public ResultResp getAsset() {
        log.info("<-- api updateAsset: start, ");
        try {
            return ResultResp.success(assetService.getAsset());

        } catch (CustomExceptionHandler e) {
            return ResultResp.badRequest(ErrorCode.USERNAME_NOT_FOUND);
        } catch (Exception e) {
            log.error("<--- api find AssetResources: error, ");
            e.printStackTrace();
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }

    }
}

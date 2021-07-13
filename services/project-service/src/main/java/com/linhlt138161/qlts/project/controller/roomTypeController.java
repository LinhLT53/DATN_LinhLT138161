package com.linhlt138161.qlts.project.controller;

import com.linhlt138161.qlts.project.dto.RoomTypeDTO;
import com.linhlt138161.qlts.project.entity.RoomTypeEntity;
import com.linhlt138161.qlts.project.service.RoomTypeService;
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
@RequestMapping("/roomType")
@CrossOrigin("*")
public class roomTypeController {
    private final Logger log = LogManager.getLogger(roomController.class);
    @Autowired
    RoomTypeService roomTypeService;

    @PostMapping("/searchRoom")
    public ResponseEntity<List<RoomTypeEntity>> searchAseer(@RequestBody RoomTypeDTO dto){
        log.info("----------------api searchAsser-----------------");
        try {
            log.info("----------------api searchRoom Ok-----------------");
            return new ResponseEntity(roomTypeService.searchRoom(dto), HttpStatus.OK);
        }catch (Exception e){
            log.info("----------------api searchRoom thất bại-----------------");

            throw  e;
        }
    }
    @PostMapping("/add")
    public ResultResp createHR(@RequestBody RoomTypeDTO dto, HttpServletRequest request) {
        log.info("----------------api addRoom-----------------");
        try {
            return ResultResp.success(ErrorCode.CREATED_HR_OK, roomTypeService.create(dto));
        } catch (CustomExceptionHandler e) {
            if (e.getMsgCode().equalsIgnoreCase(ErrorCode.CREATED_HR_EXIST.getCode()))
                return ResultResp.badRequest(ErrorCode.CREATED_HR_EXIST);
        }
        return ResultResp.badRequest(ErrorCode.CREATED_HR_FALSE);
    }

    @GetMapping("/get-all")
    public ResultResp getAll(){
        log.info("get all roomtype");
        try{
            return ResultResp.success(roomTypeService.getAll());
        }catch (CustomExceptionHandler e){
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }
    }

    @GetMapping("/get-by-id-type/{id}/{type}")
    public ResultResp getOneById(@PathVariable("id") Long id, @PathVariable("type") Long type) {
        log.info("find by id and type");
        try {
            return ResultResp.success(roomTypeService.findByIdAndType(id,type));
        } catch (Exception e) {
            log.error("<--- api find AssetResources: error, ");
            e.printStackTrace();
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }
    }

    @GetMapping("/get-room-by-id/{id}")
    public ResultResp getOneById(@PathVariable("id") Long id) {
        log.info("<-- api updateRoom: start, ", id);
        try {
            return ResultResp.success(roomTypeService.findById(id));

        } catch (CustomExceptionHandler e) {
            return ResultResp.badRequest(ErrorCode.USERNAME_NOT_FOUND);
        } catch (Exception e) {
            log.error("<--- api find AssetResources: error, ");
            e.printStackTrace();
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }
    }
    @GetMapping("/deleteRoom/{id}")
    public ResultResp deleteProject(@PathVariable("id") Long id,HttpServletRequest request) {
        log.info("----------------api delete phong -----------------");
        try {
            return ResultResp.success(roomTypeService.delete(id));
        } catch (CustomExceptionHandler e) {
            log.info("----------------api delete nhan su faile-----------------");
            return ResultResp.badRequest(ErrorCode.DELETE_HR_FAIL);
        }
    }

    @GetMapping("/get-room-tuype-All")
    public ResultResp getAsset() {
        log.info("<-- api updateAsset: start, ");
        try {
            return ResultResp.success(roomTypeService.getRomtype());

        } catch (CustomExceptionHandler e) {
            return ResultResp.badRequest(ErrorCode.USERNAME_NOT_FOUND);
        } catch (Exception e) {
            log.error("<--- api find AssetResources: error, ");
            e.printStackTrace();
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }

    }
}


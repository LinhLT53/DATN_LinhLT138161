package com.linhlt138161.qlts.project.controller;

import com.linhlt138161.qlts.project.dto.RoomDTO;
import com.linhlt138161.qlts.project.service.RoomService;
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
@RequestMapping("/room")
@CrossOrigin("*")
public class roomController {
    private final Logger log = LogManager.getLogger(roomController.class);
    @Autowired
    RoomService roomService;

    @PostMapping("/onSearch")
    public ResponseEntity<List<RoomDTO>> onSearch(@RequestBody RoomDTO RoomDTO){
        log.info("----------------api searchAsser-----------------");
        try {
            log.info("----------------api searchRoom Ok-----------------");
            return new ResponseEntity(roomService.onSearch(RoomDTO), HttpStatus.OK);
        }catch (Exception e){
            log.info("----------------api searchRoom thất bại-----------------");
            throw  e;
        }
    }

    @PostMapping("/searchRoom")
    public ResponseEntity<List<RoomDTO>> searchAseer(@RequestBody RoomDTO RoomDTO){
        log.info("----------------api searchAsser-----------------");
        try {
            log.info("----------------api searchRoom Ok-----------------");
            return new ResponseEntity(roomService.searchAsser(RoomDTO), HttpStatus.OK);
        }catch (Exception e){
            log.info("----------------api searchRoom thất bại-----------------");
            throw  e;
        }
    }
    @PostMapping("/add")
    public ResultResp createHR(@RequestBody RoomDTO partnerDTO, HttpServletRequest request) {
        log.info("----------------api addRoom-----------------");
        try {
            return ResultResp.success(ErrorCode.CREATED_HR_OK, roomService.create(partnerDTO));
        } catch (CustomExceptionHandler e) {
            if (e.getMsgCode().equalsIgnoreCase(ErrorCode.CREATED_HR_EXIST.getCode()))
                return ResultResp.badRequest(ErrorCode.CREATED_HR_EXIST);
        }
        return ResultResp.badRequest(ErrorCode.CREATED_HR_FALSE);
    }

    @GetMapping("/get-all-room")
    private ResultResp getAllRoom(){
        log.info("get all room");
        try {
            return ResultResp.success(ErrorCode.CREATED_HR_OK, roomService.getAll());
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
            return ResultResp.success(roomService.findById(id));

        } catch (CustomExceptionHandler e) {
            return ResultResp.badRequest(ErrorCode.USERNAME_NOT_FOUND);
        } catch (Exception e) {
            log.error("<--- api find AssetResources: error, ");
            e.printStackTrace();
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }
    }
    @GetMapping("/getAllFloor")
    public ResultResp getAllFloor(){
        log.info("Get all floor");
        try {
            return ResultResp.success(roomService.getAllFloor());

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
            return ResultResp.success(roomService.delete(id));
        } catch (CustomExceptionHandler e) {
            log.info("----------------api delete nhan su faile-----------------");
            return ResultResp.badRequest(ErrorCode.DELETE_HR_FAIL);
        }
    }
}

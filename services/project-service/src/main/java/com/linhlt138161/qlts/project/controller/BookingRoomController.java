package com.linhlt138161.qlts.project.controller;

import com.linhlt138161.qlts.project.dto.BookingRoomDTO;
import com.linhlt138161.qlts.project.dto.BookingRoomServiceDTO;
import com.linhlt138161.qlts.project.dto.PayDto;
import com.linhlt138161.qlts.project.service.BookingRoomService;
import com.linhlt138161.qlts.project.service.PayService;
import com.linhlt138161.qlts.project.service.impl.PayServiceImpl;
import common.ErrorCode;
import common.ResultResp;
import exception.CustomExceptionHandler;
import lombok.Data;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin("*")
public class BookingRoomController {
    private final Logger logger = LogManager.getLogger(roomController.class);
    @Autowired
    private BookingRoomService bookingRoomService;

    @Autowired
    private PayService payService;
    @PostMapping("/add")
    public ResultResp createBooking(@RequestBody BookingRoomDTO bookingRoomDTO) {
        logger.info("Add booking room");
        try {
            return bookingRoomService.add(bookingRoomDTO);
        } catch (CustomExceptionHandler e) {
            return ResultResp.serverError(ErrorCode.SERVER_ERROR);
        }
    }

    @PutMapping("/receive")
    public ResultResp receiveBooking(@RequestBody BookingRoomDTO bookingRoomDTO) {
        logger.info("Nhận lịch đặt phòng khách sạn");
        try {
            return bookingRoomService.receive(bookingRoomDTO.getBookingroomId());
        } catch (CustomExceptionHandler e) {
            return ResultResp.serverError(ErrorCode.SERVER_ERROR);
        }
    }

    @GetMapping("/getInfo/{bookingRoomId}")
    public ResultResp receiveBooking(@PathVariable Long bookingRoomId) {
        logger.info("Lấy danh sách đặt phòng theo id");
        try {
            return ResultResp.success(bookingRoomService.getInfo(bookingRoomId));
        } catch (CustomExceptionHandler e) {
            return ResultResp.serverError(ErrorCode.SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{bookingRoomId}")
    public ResultResp deleteBooking(@PathVariable Long bookingRoomId) {
        logger.info("Xóa lịch đặt phòng khách sạn");
        try {
            return bookingRoomService.delete(bookingRoomId);
        } catch (CustomExceptionHandler e) {
            return ResultResp.serverError(ErrorCode.SERVER_ERROR);
        }
    }

    @PostMapping("/onSearch")
    public ResponseEntity<List<BookingRoomDTO>> onSearch(@RequestBody BookingRoomDTO bookingRoomDTO) {
        logger.info("----------------search booking room-----------------");
        try {
            logger.info("----------------api search booking room Ok-----------------");
            return new ResponseEntity(bookingRoomService.onSearch(bookingRoomDTO), HttpStatus.OK);
        } catch (Exception e) {
            logger.info("----------------api search booking room thất bại-----------------");
            throw e;
        }
    }

    @PostMapping("/addService")
    public ResultResp addService(@RequestBody BookingRoomDTO bookingRoomDTO) {
        logger.info("Add service booking room");
        try {
            logger.info("----------------api search booking room Ok-----------------");
            return bookingRoomService.addService(bookingRoomDTO);
        } catch (Exception e) {
            logger.info("----------------api search booking room thất bại-----------------");
            return ResultResp.serverError(ErrorCode.SERVER_ERROR);
        }

    }

    @GetMapping("/getAllServiceBooking/{bookingId}")
    public ResponseEntity<List<BookingRoomServiceDTO>> getServiceByBookingId(@PathVariable Long bookingRoomId) {
        logger.info("----------------get Service by booking room Id-----------------");
        try {
            logger.info("----------------Start-----------------");
            return new ResponseEntity(bookingRoomService.getServiceByBookingId(bookingRoomId), HttpStatus.OK);
        } catch (Exception e) {
            logger.info("----------------Error-----------------");
            return ResultResp.serverError(ErrorCode.SERVER_ERROR);
        }
    }

    @GetMapping("/getPay/{bookingRoomId}")
    public ResponseEntity<PayDto> getPay(@PathVariable Integer bookingRoomId) {
        logger.info("----------------get Service by booking room Id-----------------");
        try {
            logger.info("----------------Start-----------------");
            return new ResponseEntity(payService.getServiceRoom(Long.valueOf(bookingRoomId)), HttpStatus.OK);
        } catch (Exception e) {
            logger.info("----------------Error-----------------");
            return ResultResp.serverError(ErrorCode.SERVER_ERROR);
        }
    }
    @PostMapping("/discountPay/{bookingRoomId}")
    public ResponseEntity<PayDto> billPlease(@RequestBody PayDto payDto) {
        logger.info("----------------get Service by booking room Id-----------------");
        try {
            logger.info("----------------Start-----------------");
            return new ResponseEntity(payService.billBookroom(payDto), HttpStatus.OK);
        } catch (Exception e) {
            logger.info("----------------Error-----------------");
            return ResultResp.serverError(ErrorCode.SERVER_ERROR);
        }
    }

    @PutMapping("/getService/{bookingRoomId}")
    public ResponseEntity<PayDto> getService(@PathVariable PayDto payDto) {
        logger.info("----------------get Service by booking room Id-----------------");
        try {
            logger.info("----------------Start-----------------");
            return new ResponseEntity(payService.billBookroom(payDto), HttpStatus.OK);
        } catch (Exception e) {
            logger.info("----------------Error-----------------");
            return ResultResp.serverError(ErrorCode.SERVER_ERROR);
        }
    }
    @PostMapping("/getChart")

    public ResponseEntity<?> getDataChart(@RequestBody Char aChar){
        logger.info("----------------get Service by booking room Id-----------------");
        try {
            logger.info("----------------Start-----------------");
            return new ResponseEntity(payService.getList(aChar.quy,aChar.nam), HttpStatus.OK);
        } catch (Exception e) {
            logger.info("----------------Error-----------------");
            return ResultResp.serverError(ErrorCode.SERVER_ERROR);
        }
    }
}

@Data
class Char{
    List<Integer> quy;
    Integer nam;
}

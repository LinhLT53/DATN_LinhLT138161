package com.thao.qlts.project.service;

import com.thao.qlts.project.dto.BookingRoomDTO;
import com.thao.qlts.project.dto.BookingRoomServiceDTO;
import com.thao.qlts.project.dto.DataPage;
import com.thao.qlts.project.entity.BookingRoomEntity;
import com.thao.qlts.project.entity.BookingRoomServiceEntity;
import common.ResultResp;

import java.util.List;

public interface BookingRoomService {
    ResultResp add(BookingRoomDTO bookingRoomDTO);
    DataPage<BookingRoomDTO> onSearch(BookingRoomDTO dto);
    ResultResp addService(BookingRoomDTO dto);
    List<BookingRoomServiceDTO> getServiceByBookingId(Long bookingId);
    ResultResp receive(Long bookingRoomId);
    ResultResp delete(Long bookingRoomId);
    BookingRoomDTO getInfo(Long bookingRoomId);
    BookingRoomEntity getIdBookRoom(Long bookingRoomId);
    List<BookingRoomEntity> getListBook(List<Long> id);

    List<BookingRoomServiceEntity> getListService(List<Long> id);

    void addEntity(BookingRoomEntity bookingRoomEntity);

}
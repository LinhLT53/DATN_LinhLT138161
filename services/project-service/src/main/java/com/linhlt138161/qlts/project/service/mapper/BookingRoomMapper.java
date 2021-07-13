package com.linhlt138161.qlts.project.service.mapper;

import com.linhlt138161.qlts.project.dto.BookingRoomDTO;
import com.linhlt138161.qlts.project.entity.BookingRoomEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingRoomMapper extends EntityMapper<BookingRoomDTO, BookingRoomEntity>{
}

package com.thao.qlts.project.service.mapper;

import com.thao.qlts.project.dto.BookingRoomDTO;
import com.thao.qlts.project.entity.BookingRoomEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingRoomMapper extends EntityMapper<BookingRoomDTO, BookingRoomEntity>{
}

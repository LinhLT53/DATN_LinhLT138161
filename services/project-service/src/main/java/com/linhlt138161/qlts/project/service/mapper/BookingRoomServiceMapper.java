package com.linhlt138161.qlts.project.service.mapper;

import com.linhlt138161.qlts.project.dto.BookingRoomServiceDTO;
import com.linhlt138161.qlts.project.entity.BookingRoomServiceEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingRoomServiceMapper extends EntityMapper<BookingRoomServiceDTO, BookingRoomServiceEntity> {
}

package com.thao.qlts.project.service.mapper;

import com.thao.qlts.project.dto.BookingRoomServiceDTO;
import com.thao.qlts.project.entity.BookingRoomServiceEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingRoomServiceMapper extends EntityMapper<BookingRoomServiceDTO, BookingRoomServiceEntity> {
}

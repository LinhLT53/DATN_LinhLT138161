package com.thao.qlts.project.service.mapper;

import com.thao.qlts.project.dto.RoomDTO;
import com.thao.qlts.project.entity.RoomEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomMapper extends EntityMapper<RoomDTO, RoomEntity> {
}

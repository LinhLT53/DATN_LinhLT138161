package com.linhlt138161.qlts.project.service.mapper;

import com.linhlt138161.qlts.project.dto.RoomDTO;
import com.linhlt138161.qlts.project.entity.RoomEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomMapper extends EntityMapper<RoomDTO, RoomEntity> {
}

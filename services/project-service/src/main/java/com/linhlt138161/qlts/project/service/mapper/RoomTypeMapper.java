package com.linhlt138161.qlts.project.service.mapper;

import com.linhlt138161.qlts.project.dto.RoomTypeDTO;
import com.linhlt138161.qlts.project.entity.RoomTypeEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomTypeMapper extends EntityMapper<RoomTypeDTO, RoomTypeEntity> {
}

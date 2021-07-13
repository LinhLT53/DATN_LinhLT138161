package com.thao.qlts.project.service.mapper;

import com.thao.qlts.project.dto.RoomTypeDTO;
import com.thao.qlts.project.entity.RoomTypeEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomTypeMapper extends EntityMapper<RoomTypeDTO, RoomTypeEntity> {
}

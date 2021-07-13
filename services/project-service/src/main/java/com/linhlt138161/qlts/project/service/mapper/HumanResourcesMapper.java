package com.linhlt138161.qlts.project.service.mapper;

import com.linhlt138161.qlts.project.entity.HumanResourcesEntity;
import com.linhlt138161.qlts.project.dto.HumanResourcesDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HumanResourcesMapper extends EntityMapper<HumanResourcesDTO,HumanResourcesEntity> {
}

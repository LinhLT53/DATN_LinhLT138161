package com.thao.qlts.project.service.mapper;

import com.thao.qlts.project.entity.HumanResourcesEntity;
import com.thao.qlts.project.dto.HumanResourcesDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HumanResourcesMapper extends EntityMapper<HumanResourcesDTO,HumanResourcesEntity> {
}

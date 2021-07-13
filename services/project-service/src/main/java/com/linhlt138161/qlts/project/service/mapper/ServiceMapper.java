package com.thao.qlts.project.service.mapper;

import com.thao.qlts.project.dto.ServiceDTO;
import com.thao.qlts.project.entity.ServiceEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServiceMapper extends EntityMapper<ServiceDTO, ServiceEntity>  {
}

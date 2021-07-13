package com.linhlt138161.qlts.project.service.mapper;

import com.linhlt138161.qlts.project.dto.ServiceDTO;
import com.linhlt138161.qlts.project.entity.ServiceEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServiceMapper extends EntityMapper<ServiceDTO, ServiceEntity>  {
}

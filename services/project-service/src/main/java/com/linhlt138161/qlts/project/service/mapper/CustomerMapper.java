package com.linhlt138161.qlts.project.service.mapper;

import com.linhlt138161.qlts.project.dto.CustomerDTO;
import com.linhlt138161.qlts.project.entity.CustomerEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper extends EntityMapper<CustomerDTO, CustomerEntity> {
}

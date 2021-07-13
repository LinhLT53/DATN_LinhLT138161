package com.thao.qlts.project.service.mapper;

import com.thao.qlts.project.dto.CustomerDTO;
import com.thao.qlts.project.entity.CustomerEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper extends EntityMapper<CustomerDTO, CustomerEntity> {
}

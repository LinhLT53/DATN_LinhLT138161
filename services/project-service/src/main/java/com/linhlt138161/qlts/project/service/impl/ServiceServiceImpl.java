package com.linhlt138161.qlts.project.service.impl;

import com.linhlt138161.qlts.project.dto.DataPage;
import com.linhlt138161.qlts.project.dto.ServiceDTO;
import com.linhlt138161.qlts.project.entity.ServiceEntity;
import com.linhlt138161.qlts.project.repository.customreporsitory.ServiceCustomRepository;
import com.linhlt138161.qlts.project.repository.jparepository.ServiceRepository;
import com.linhlt138161.qlts.project.service.ServiceService;
import com.linhlt138161.qlts.project.service.mapper.ServiceMapper;
import common.ErrorCode;
import exception.CustomExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "serviceService")
public class ServiceServiceImpl implements ServiceService {
    @Autowired
    private ServiceCustomRepository serviceCustomRepository;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    private ServiceMapper serviceMapper;

    @Override
    public DataPage<ServiceDTO> searchService(ServiceDTO dto) {
        DataPage<ServiceDTO> dtoDataPage = new DataPage<>();

        dto.setPage(null != dto.getPage() ? dto.getPage().intValue() : 1);
        dto.setPageSize(null != dto.getPageSize() ? dto.getPageSize().intValue() : 10);
        List<ServiceDTO> list = new ArrayList<>();
        try {
            list = serviceCustomRepository.searchService(dto);
            dtoDataPage.setData(list);

        }catch (Exception e){
            throw e;
        }
        dtoDataPage.setPageIndex(dto.getPage());
        dtoDataPage.setPageSize(dto.getPageSize());
        dtoDataPage.setDataCount(dto.getTotalRecord());
        dtoDataPage.setPageCount(dto.getTotalRecord() / dto.getPageSize());
        if (dtoDataPage.getDataCount() % dtoDataPage.getPageSize() != 0) {
            dtoDataPage.setPageCount(dtoDataPage.getPageCount() + 1);
        }
        return dtoDataPage;
    }


    @Override
    public DataPage<ServiceDTO> getPagePartSeach(ServiceDTO dto) {
        return null;
    }

    @Override
    public ServiceDTO create(ServiceDTO dto) {
        ServiceEntity entity = serviceRepository.findByID(dto.getServiceId());

        if (null != entity && dto.getServiceId() == null) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        }
        else if (null != entity) {
            //TODO: Update  phong
            entity.setServiceId(Long.valueOf(dto.getDepartmentId()));
            entity.setServicecode(dto.getServicecode());
            entity.setServicename(dto.getServicename());
            entity.setPrice(dto.getPrice());
            entity.setUnit(dto.getUnit());
            entity.setNote(dto.getNote());
            entity.setStatus(1);
        }
        else if (dto.getServiceId() == null) {
            //TODO: create phong
            entity = new ServiceEntity();
            entity.setServicecode(dto.getServicecode());
            entity.setServicename(dto.getServicename());
            entity.setPrice(dto.getPrice());
            entity.setUnit(dto.getUnit());
            entity.setNote(dto.getNote());
            entity.setStatus(1);
        }
        serviceRepository.save(entity);
        return convertEntitytoDTO(entity);

    }

    @Override
    public ServiceDTO update(ServiceDTO partnerDTO) {
        return null;
    }

    @Override
    public ServiceDTO delete(Long id) {
        ServiceEntity entity = serviceRepository.findById(id).get();
        ServiceDTO dto =  convertEntitytoDTO(entity);
        if (null == dto) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        }else{
            entity.setServiceId(Long.valueOf(dto.getServiceId()));
            entity.setStatus(-1);
            serviceRepository.save(entity);
            return dto;
        }
    }

    @Override
    public ServiceDTO findById(Long Id) {
        return convertEntitytoDTO(serviceRepository.findById(Id).get());

    }

    @Override
    public ServiceDTO findByCode(String code) {
        return null;
    }

    @Override
    public List<ServiceDTO> findAllService() {
        return serviceMapper.toDto(serviceRepository.findAllService());
    }

    public ServiceDTO convertEntitytoDTO(ServiceEntity entity) {
        ServiceDTO dto = new ServiceDTO();
        dto.setServiceId(entity.getServiceId());
        dto.setServicecode(entity.getServicecode());
        dto.setServicename(entity.getServicename());
        dto.setPrice(entity.getPrice());
        dto.setUnit(entity.getUnit());
        dto.setStatus(entity.getStatus());
        dto.setNote(entity.getNote());
        return dto;
    }
}

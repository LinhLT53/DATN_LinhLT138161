package com.linhlt138161.qlts.project.service.impl;

import com.linhlt138161.qlts.project.dto.DataPage;
import com.linhlt138161.qlts.project.dto.ServiceDutyDTO;
import com.linhlt138161.qlts.project.entity.ServiceDutyEntity;
import com.linhlt138161.qlts.project.repository.customreporsitory.DutyCustomerReponsitory;
import com.linhlt138161.qlts.project.repository.jparepository.ServiceDutyResponsitory;
import com.linhlt138161.qlts.project.service.serviceDutyService;
import common.ErrorCode;
import exception.CustomExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "serviceDutySevice")

public class ServiceDutySeviceImpl implements serviceDutyService {
    @Autowired
    private ServiceDutyResponsitory serviceDutyResponsitory;
    @Autowired
    private DutyCustomerReponsitory dutyCustomerReponsitory;
    @Override
    public DataPage<ServiceDutyDTO> searchPromotion(ServiceDutyDTO dto) {
        DataPage<ServiceDutyDTO> dtoDataPage = new DataPage<>();

        dto.setPage(null != dto.getPage() ? dto.getPage().intValue() : 1);
        dto.setPageSize(null != dto.getPageSize() ? dto.getPageSize().intValue() : 10);
        List<ServiceDutyDTO> list = new ArrayList<>();
        try {
            list = dutyCustomerReponsitory.search(dto);
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
    public DataPage<ServiceDutyDTO> getPagePartSeach(ServiceDutyDTO dto) {
        return null;
    }

    @Override
    public ServiceDutyDTO create(ServiceDutyDTO dto) {
        List<ServiceDutyEntity> listdata = serviceDutyResponsitory.findByServicecode(dto.getServicecode());
        ServiceDutyEntity entity = new ServiceDutyEntity();

        if (listdata.size() != 0 && dto.getId() == null) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        }
        else if (0 != listdata.size()) {
             entity = listdata.get(0);

            //TODO: Update  Khuyen mai
            entity.setId(Long.valueOf(dto.getId()));
            entity.setServicecode(dto.getServicecode());
            entity.setStartDateTime(dto.getStartDateTime());
            entity.setEndDateTime(dto.getEndDateTime());
            entity.setAcTualStartDateTime(dto.getAcTualStartDateTime());
            entity.setAcTualEndDateTime(dto.getAcTualEndDateTime());
            entity.setDate(dto.getDate());
            entity.setStaffID(dto.getStaffID());
            entity.setRoomID(dto.getRoomID());
            entity.setNote(dto.getNote());
            entity.setStatus(1);
            //entity.setRoomTypeID(dto.getRoomTypeID());
        }
        else if (dto.getId() == null) {
            //TODO: create phong
            entity.setServicecode(dto.getServicecode());
            entity.setStartDateTime(dto.getStartDateTime());
            entity.setEndDateTime(dto.getEndDateTime());
            entity.setAcTualStartDateTime(dto.getAcTualStartDateTime());
            entity.setAcTualEndDateTime(dto.getAcTualEndDateTime());
            entity.setDate(dto.getDate());
            entity.setStaffID(dto.getStaffID());
            entity.setRoomID(dto.getRoomID());
            entity.setNote(dto.getNote());
            entity.setStatus(1);
        }
        serviceDutyResponsitory.save(entity);


        return convertEntitytoDTO(entity);

    }
    @Override
    public ServiceDutyDTO update(ServiceDutyDTO dto) {
      return null;
    }

    @Override
    public ServiceDutyDTO delete(Long id) {
        ServiceDutyEntity entity =  serviceDutyResponsitory.findByID(id);
        if (null == entity) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        }else{
            entity.setStatus(0);
            serviceDutyResponsitory.save(entity);
            return convertEntitytoDTO(entity);
        }
    }

    @Override
    public ServiceDutyDTO findById(Long Id) {
        ServiceDutyDTO dto = convertEntitytoDTO(serviceDutyResponsitory.findById(Id).get());
        return dto;
    }

    @Override
    public ServiceDutyDTO findByCode(String code) {
        return null;
    }

    @Override
    public ServiceDutyDTO getByCodeAndRoomType(String code, Long roomType, String date) {
        return null;
    }

    @Override
    public List<ServiceDutyDTO> getAllByRoomType(Long roomType, String date) {
        return null;
    }
    public ServiceDutyDTO convertEntitytoDTO(ServiceDutyEntity entity) {
        ServiceDutyDTO dto = new ServiceDutyDTO();
        dto.setId(entity.getId());
        dto.setServicecode(entity.getServicecode());
        dto.setDate(entity.getDate());
        dto.setStartDateTime(entity.getStartDateTime());
        dto.setEndDateTime(entity.getEndDateTime());
        dto.setAcTualStartDateTime(entity.getAcTualStartDateTime());
         dto.setAcTualEndDateTime(entity.getAcTualStartDateTime());
         dto.setStaffID(entity.getStaffID());
         dto.setRoomID(entity.getRoomID());
        dto.setStatus(entity.getStatus());
        dto.setStatus(entity.getStatus());
        dto.setNote(entity.getNote());
        return dto;
    }
}

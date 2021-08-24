package com.linhlt138161.qlts.project.service;

import com.linhlt138161.qlts.project.dto.DataPage;
import com.linhlt138161.qlts.project.dto.ServiceDutyDTO;

import java.util.List;

public interface serviceDutyService {
    DataPage<ServiceDutyDTO> searchPromotion(ServiceDutyDTO dto);
    DataPage<ServiceDutyDTO> getPagePartSeach(ServiceDutyDTO dto);
    ServiceDutyDTO create(ServiceDutyDTO dto);
    ServiceDutyDTO update(ServiceDutyDTO dto);
    ServiceDutyDTO delete (Long id);
    ServiceDutyDTO findById(Long Id);
    ServiceDutyDTO findByCode(String code);
    ServiceDutyDTO getByCodeAndRoomType(String code, Long roomType, String date);
    List<ServiceDutyDTO> getAllByRoomType(Long roomType, String date);
}

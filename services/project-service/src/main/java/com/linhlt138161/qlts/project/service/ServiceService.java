package com.linhlt138161.qlts.project.service;

import com.linhlt138161.qlts.project.dto.DataPage;
import com.linhlt138161.qlts.project.dto.ServiceDTO;

import java.util.List;

public interface ServiceService {
    DataPage<ServiceDTO> searchService(ServiceDTO dto);
    DataPage<ServiceDTO> getPagePartSeach(ServiceDTO dto);
    ServiceDTO create(ServiceDTO dto);
    ServiceDTO update(ServiceDTO dto);
    ServiceDTO delete (Long id);
    ServiceDTO findById(Long Id);
    ServiceDTO findByCode(String code);
    List<ServiceDTO> findAllService();
}

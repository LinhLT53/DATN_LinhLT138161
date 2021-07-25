package com.linhlt138161.qlts.project.service.mapper;

import com.linhlt138161.qlts.project.dto.AppParamDTO;
import com.linhlt138161.qlts.project.dto.DataPage;
import com.linhlt138161.qlts.project.dto.tourDTO;

import java.util.List;

public interface TourService {
    tourDTO create(tourDTO dto);
    tourDTO update(tourDTO dto);
    tourDTO delete (Long id);
    tourDTO findById(Long Id);
    tourDTO findByCode(String code);
    DataPage<tourDTO> onSearch(tourDTO dto);
    List<tourDTO> getAll();
    List<AppParamDTO> getAllFloor();
}

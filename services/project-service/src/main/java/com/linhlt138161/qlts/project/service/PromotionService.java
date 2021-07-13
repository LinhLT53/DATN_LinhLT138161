package com.linhlt138161.qlts.project.service;


import com.linhlt138161.qlts.project.dto.DataPage;
import com.linhlt138161.qlts.project.dto.promotionDTO;

import java.util.Date;
import java.util.List;

public interface PromotionService {
    DataPage<promotionDTO> searchPromotion(promotionDTO dto);
    DataPage<promotionDTO> getPagePartSeach(promotionDTO dto);
    promotionDTO create(promotionDTO dto);
    promotionDTO update(promotionDTO dto);
    promotionDTO delete (Long id);
    promotionDTO findById(Long Id);
    promotionDTO findByCode(String code);
    promotionDTO getByCodeAndRoomType(String code, Long roomType, String date);
    List<promotionDTO> getAllByRoomType(Long roomType, String date);
}

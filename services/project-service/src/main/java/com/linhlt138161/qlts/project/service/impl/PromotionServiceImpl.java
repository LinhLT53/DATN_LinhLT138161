package com.thao.qlts.project.service.impl;


import com.thao.qlts.project.dto.DataPage;
import com.thao.qlts.project.dto.promotionDTO;
import com.thao.qlts.project.entity.promotionEntity;
import com.thao.qlts.project.entity.promotionRoomTypeEntity;
import com.thao.qlts.project.repository.customreporsitory.promotionCustomRepository;
import com.thao.qlts.project.repository.jparepository.PromotionRepository;
import com.thao.qlts.project.repository.jparepository.promotionRoomTypeRepository;
import com.thao.qlts.project.service.PromotionService;
//import com.thao.qlts.project.service.mapper.PromotionMapper;
import common.CommonUtils;
import common.ErrorCode;
import exception.CustomExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service(value = "promotionService")
public class PromotionServiceImpl  implements PromotionService {
    @Autowired
    private promotionCustomRepository customRepository;
    @Autowired
    PromotionRepository promotionRepository;
    @Autowired
    promotionRoomTypeRepository promotionRoomTypeRepository;
    @Override
    public DataPage<promotionDTO> searchPromotion(promotionDTO dto) {
        DataPage<promotionDTO> dtoDataPage = new DataPage<>();

        dto.setPage(null != dto.getPage() ? dto.getPage().intValue() : 1);
        dto.setPageSize(null != dto.getPageSize() ? dto.getPageSize().intValue() : 10);
        List<promotionDTO> list = new ArrayList<>();
        try {
            list = customRepository.searchPromotion(dto);
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
    public DataPage<promotionDTO> getPagePartSeach(promotionDTO dto) {
        return null;
    }

    @Override
    public promotionDTO create(promotionDTO dto) {
        promotionEntity entity = promotionRepository.findByID(dto.getPromotionId());

        if (null != entity && dto.getPromotionId() == null) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        }
        else if (null != entity) {
            //TODO: Update  Khuyen mai
            entity.setPromotionId(Long.valueOf(dto.getPromotionId()));
            entity.setPromotionCode(dto.getPromotionCode());
            entity.setPromotionName(dto.getPromotionName());
            entity.setStartDate(dto.getStartDate());
            entity.setEndDate(dto.getEndDate());
            entity.setPercentPromotion(dto.getPercentPromotion());
            entity.setNote(dto.getNote());
            entity.setStatus(1);
            //entity.setRoomTypeID(dto.getRoomTypeID());
        }
        else if (dto.getPromotionId() == null) {
            //TODO: create phong
            entity = new promotionEntity();
            entity.setPromotionCode(dto.getPromotionCode());
            entity.setPromotionName(dto.getPromotionName());
            entity.setStartDate(dto.getStartDate());
            entity.setEndDate(dto.getEndDate());
            entity.setPercentPromotion(dto.getPercentPromotion());
            entity.setNote(dto.getNote());
            entity.setStatus(1);
          //  entity.setRoomTypeID(dto.getRoomTypeID());
        }
        promotionRepository.save(entity);
        for (Long i: promotionRoomTypeRepository.deleteroomID(entity.getRoomTypeID())) {
            promotionRoomTypeRepository.deleteById(i);
        }
        List<promotionRoomTypeEntity> list = new ArrayList<>();
        for (Long item : dto.getRoomTypeID()) {
            promotionRoomTypeEntity assetRoomEntity = new promotionRoomTypeEntity();
            assetRoomEntity.setRoomTypeid(item);
            assetRoomEntity.setPromotionid(entity.getPromotionId());
            assetRoomEntity.setIsActive(1);
            list.add(assetRoomEntity);
        }
        promotionRoomTypeRepository.saveAll(list);

        return convertEntitytoDTO(entity);

    }

    @Override
    public promotionDTO update(promotionDTO partnerDTO) {
        return null;
    }

    @Override
    public promotionDTO delete(Long id) {
        promotionDTO dto =  convertEntitytoDTO(promotionRepository.findById(id).get());
        if (null == dto) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        }else{
            promotionEntity entity = new promotionEntity();
            entity.setPromotionId(Long.valueOf(dto.getPromotionId()));
            entity.setStatus(0);
            promotionRepository.save(entity);
            return dto;
        }
    }

    @Override
    public promotionDTO findById(Long Id) {

        promotionDTO dto = convertEntitytoDTO(promotionRepository.findById(Id).get());
        dto.setRoomTypeID(promotionRoomTypeRepository.findByroomTypeID(Id));
        return dto;
    }

    @Override
    public promotionDTO findByCode(String code) {
        return null;
    }

    @Override
    public promotionDTO getByCodeAndRoomType(String code, Long roomType, String date) {
        promotionDTO dto = null;
        if (promotionRepository.findByCodeAndRoomType(code, roomType, date) != null){
             dto = convertEntitytoDTO(promotionRepository.findByCodeAndRoomType(code, roomType, date));
        }
        return dto;
    }

    @Override
    public List<promotionDTO> getAllByRoomType(Long roomType, String date) {
        List<promotionDTO> list = new ArrayList<>();
        List<promotionEntity> listEntity = null;
        listEntity = promotionRepository.findByRoomType(roomType, date);
        if (!CommonUtils.isEqualsNullOrEmpty(listEntity)){
            for (promotionEntity entity : listEntity){
                promotionDTO dto = convertEntitytoDTO(entity);
                list.add(dto);
            }
        }
        return list;
    }

    public promotionDTO convertEntitytoDTO(promotionEntity entity) {
        promotionDTO dto = new promotionDTO();
        dto.setPromotionId(entity.getPromotionId());
        dto.setPromotionCode(entity.getPromotionCode());
        dto.setPromotionName(entity.getPromotionName());
        dto.setStartDate(entity.getStartDate());
        dto.setEndDate(entity.getEndDate());
        dto.setPercentPromotion(entity.getPercentPromotion());
       // dto.setRoomTypeID(entity.getRoomTypeID());
        dto.setStatus(entity.getStatus());
        dto.setNote(entity.getNote());
        return dto;
    }
}

package com.linhlt138161.qlts.project.service.impl;

import com.linhlt138161.qlts.project.dto.AssetDTO;
import com.linhlt138161.qlts.project.dto.DataPage;
import com.linhlt138161.qlts.project.entity.AssetEntity;
import com.linhlt138161.qlts.project.repository.customreporsitory.AssetCustomRepository;
import com.linhlt138161.qlts.project.repository.jparepository.AssetRepository;
import com.linhlt138161.qlts.project.service.AssetService;

import common.ErrorCode;
import exception.CustomExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

import java.util.List;

@Service(value = "assetService")
public class AssetServiceImpl implements AssetService {
    @Autowired
    private AssetCustomRepository assetCustomRepository;
    @Autowired
    AssetRepository assetRepository;

    @Override
    public DataPage<AssetDTO> searchAsser(AssetDTO dto) {
        DataPage<AssetDTO> dtoDataPage = new DataPage<>();

        dto.setPage(null != dto.getPage() ? dto.getPage().intValue() : 1);
        dto.setPageSize(null != dto.getPageSize() ? dto.getPageSize().intValue() : 10);
        List<AssetDTO> list = new ArrayList<>();
        try {
            list = assetCustomRepository.searchAsser(dto);
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
    public DataPage<AssetDTO> getPagePartSeach(AssetDTO dto) {
        return null;
    }

    @Override
    public AssetDTO create(AssetDTO dto) {
        AssetEntity assetEntity = assetRepository.findByCode(dto.getAssetCode());

        if (null != assetEntity && dto.getAssetId() == null) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        }
        else if (null != assetEntity) {
            //TODO: Update  nha cung cấp
            assetEntity.setAssetId(Long.valueOf(dto.getAssetId()));
            assetEntity.setAssetname(dto.getAssetname());
            assetEntity.setAssetCode(dto.getAssetCode());
            assetEntity.setAmount(dto.getAmount());
            assetEntity.setNote(dto.getNote());

        }
        else if (dto.getAssetId() == null) {
            //TODO: create nha cung cap
            assetEntity = new AssetEntity();
            assetEntity.setAssetname(dto.getAssetname());
            assetEntity.setAssetCode(dto.getAssetCode());
            assetEntity.setAmount(dto.getAmount());
            assetEntity.setNote(dto.getNote());
            assetEntity.setStatus(1);
        }
        assetRepository.save(assetEntity);
        return convertEntitytoDTO(assetEntity);

    }

    @Override
    public AssetDTO update(AssetDTO partnerDTO) {
        return null;
    }

    @Override
    public AssetDTO delete(Long id) {
        AssetDTO dto =  convertEntitytoDTO(assetRepository.findById(id).get());
        if (null == dto) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        }else{
            AssetEntity assetEntity = new AssetEntity();
            assetEntity.setAssetId(Long.valueOf(dto.getAssetId()));
//            assetEntity.setAssetname(dto.getAssetname());
//            assetEntity.setAssetCode(dto.getAssetCode());
//            assetEntity.setAmount(dto.getAmount());
//            assetEntity.setNote(dto.getNote());
            assetEntity.setStatus(0);
            assetRepository.save(assetEntity);
            return dto;
        }
    }

    @Override
    public AssetDTO findById(Long Id) {
        return convertEntitytoDTO(assetRepository.findById(Id).get());
    }

    @Override
    public AssetDTO findByCode(String code) {
        return null;
    }

    @Override
    public List<AssetDTO> getAsset() {
        List<AssetEntity> list = assetRepository.findAll();
        List<AssetDTO> assetDTOList = new ArrayList<>();
        for (AssetEntity item: list) {
            assetDTOList.add(convertEntitytoDTO(item));
        }
        return assetDTOList;
    }

    public AssetDTO convertEntitytoDTO(AssetEntity assetEntity) {
        AssetDTO dto = new AssetDTO();
        dto.setAssetCode(assetEntity.getAssetCode());
        dto.setAssetname(assetEntity.getAssetname());
        dto.setAmount(assetEntity.getAmount());
        dto.setNote(assetEntity.getNote());
        dto.setAssetId(assetEntity.getAssetId());
        return dto;
    }

}

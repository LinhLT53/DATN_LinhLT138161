package com.linhlt138161.qlts.project.service;


import com.linhlt138161.qlts.project.dto.AssetDTO;
import com.linhlt138161.qlts.project.dto.DataPage;


import java.io.IOException;
import java.util.List;


public interface AssetService {
    DataPage<AssetDTO> searchAsser(AssetDTO dto);
    DataPage<AssetDTO> getPagePartSeach(AssetDTO dto);
    AssetDTO create(AssetDTO partnerDTO);
    AssetDTO update(AssetDTO partnerDTO);
    AssetDTO delete (Long id);
    AssetDTO findById(Long Id);
    AssetDTO findByCode(String code);
    List<AssetDTO> getAsset();
}

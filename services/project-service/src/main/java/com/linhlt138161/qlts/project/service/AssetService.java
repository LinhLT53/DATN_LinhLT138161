package com.thao.qlts.project.service;


import com.thao.qlts.project.dto.AssetDTO;
import com.thao.qlts.project.dto.DataPage;


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

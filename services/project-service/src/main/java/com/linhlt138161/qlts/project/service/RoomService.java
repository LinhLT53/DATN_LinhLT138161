package com.thao.qlts.project.service;

import com.thao.qlts.project.dto.AppParamDTO;
import com.thao.qlts.project.dto.DataPage;
import com.thao.qlts.project.dto.RoomDTO;

import java.util.List;

public interface RoomService {
    DataPage<RoomDTO> searchAsser(RoomDTO dto);
    DataPage<RoomDTO> getPagePartSeach(RoomDTO dto);
    RoomDTO create(RoomDTO dto);
    RoomDTO update(RoomDTO dto);
    RoomDTO delete (Long id);
    RoomDTO findById(Long Id);
    RoomDTO findByCode(String code);
    DataPage<RoomDTO> onSearch(RoomDTO dto);
    List<RoomDTO> getAll();
    List<AppParamDTO> getAllFloor();

}

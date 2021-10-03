package com.linhlt138161.qlts.project.service;

import com.linhlt138161.qlts.project.dto.AppParamDTO;
import com.linhlt138161.qlts.project.dto.DataPage;
import com.linhlt138161.qlts.project.dto.RoomDTO;
import com.linhlt138161.qlts.project.dto.RoomTypeDTO;

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
    List<RoomDTO> getRomlist();

}

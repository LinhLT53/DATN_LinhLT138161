package com.thao.qlts.project.service;

import com.thao.qlts.project.dto.DataPage;
import com.thao.qlts.project.dto.RoomTypeDTO;

import java.util.List;

import java.util.List;

public interface RoomTypeService {
    DataPage<RoomTypeDTO> searchRoom(RoomTypeDTO dto);
    DataPage<RoomTypeDTO> getPagePartSeach(RoomTypeDTO dto);
    RoomTypeDTO create(RoomTypeDTO dto);
    RoomTypeDTO update(RoomTypeDTO dto);
    RoomTypeDTO delete (Long id);
    RoomTypeDTO findById(Long Id);
    RoomTypeDTO findByIdAndType(Long Id, Long type);
    RoomTypeDTO findByCode(String code);
    List<RoomTypeDTO> getRomtype();
    List<RoomTypeDTO> getAll();
}

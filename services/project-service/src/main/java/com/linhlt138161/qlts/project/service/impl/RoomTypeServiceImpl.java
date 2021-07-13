package com.thao.qlts.project.service.impl;

import com.thao.qlts.project.dto.DataPage;
import com.thao.qlts.project.dto.RoomTypeDTO;
import com.thao.qlts.project.entity.RoomTypeEntity;
import com.thao.qlts.project.repository.customreporsitory.RoomTypeCustomRepository;
import com.thao.qlts.project.repository.jparepository.RoomTypeRepository;
import com.thao.qlts.project.service.RoomTypeService;
import com.thao.qlts.project.service.mapper.RoomTypeMapper;
import common.ErrorCode;
import exception.CustomExceptionHandler;
import org.apache.poi.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "roomTypeService")
public class RoomTypeServiceImpl implements RoomTypeService {
    @Autowired
    private RoomTypeCustomRepository roomCustomRepository;
    @Autowired
    RoomTypeRepository roomTypeRepository;
    @Autowired
    private RoomTypeMapper roomTypeMapper;

    @Override
    public DataPage<RoomTypeDTO> searchRoom(RoomTypeDTO dto) {
        DataPage<RoomTypeDTO> dtoDataPage = new DataPage<>();

        dto.setPage(null != dto.getPage() ? dto.getPage().intValue() : 1);
        dto.setPageSize(null != dto.getPageSize() ? dto.getPageSize().intValue() : 10);
        List<RoomTypeDTO> list = new ArrayList<>();
        try {
            list = roomCustomRepository.searchAsser(dto);
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
    public DataPage<RoomTypeDTO> getPagePartSeach(RoomTypeDTO dto) {
        return null;
    }

    @Override
    public RoomTypeDTO create(RoomTypeDTO dto) {
        RoomTypeEntity roomEntity = roomTypeRepository.findByID(dto.getRoomTypeId());

        if (null != roomEntity && dto.getRoomTypeId() == null) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        }
        else if (null != roomEntity) {
            //TODO: Update  phong
            roomEntity.setRoomTypeId(Long.valueOf(dto.getRoomTypeId()));
            roomEntity.setCode(dto.getCode());
            roomEntity.setName(dto.getName());
            roomEntity.setDayPrice(dto.getDayPrice());
            roomEntity.setHourPrice(dto.getHourPrice());
            roomEntity.setNightPrice(dto.getNightPrice());
            roomEntity.setNote(dto.getNote());
            roomEntity.setStatus(1);
        }
        else if (dto.getRoomTypeId() == null) {
            //TODO: create phong
            roomEntity = new RoomTypeEntity();
            roomEntity.setCode(dto.getCode());
            roomEntity.setName(dto.getName());
            roomEntity.setDayPrice(dto.getDayPrice());
            roomEntity.setHourPrice(dto.getHourPrice());
            roomEntity.setNightPrice(dto.getNightPrice());
            roomEntity.setNote(dto.getNote());
            roomEntity.setStatus(1);
        }
        roomTypeRepository.save(roomEntity);
        return convertEntitytoDTO(roomEntity);

    }

    @Override
    public RoomTypeDTO update(RoomTypeDTO partnerDTO) {
        return null;
    }

    @Override
    public RoomTypeDTO delete(Long id) {
        RoomTypeDTO dto =  convertEntitytoDTO(roomTypeRepository.findById(id).get());
        if (null == dto) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        }else{
            RoomTypeEntity roomEntity = new RoomTypeEntity();
            roomEntity.setRoomTypeId(Long.valueOf(dto.getRoomTypeId()));
            roomEntity.setStatus(0);
            roomTypeRepository.save(roomEntity);
            return dto;
        }
    }

    @Override
    public RoomTypeDTO findById(Long Id) {
        return convertEntitytoDTO(roomTypeRepository.findById(Id).get());
    }

    @Override
    public RoomTypeDTO findByIdAndType(Long id, Long type) {
            RoomTypeDTO roomTypeDTO = roomTypeMapper.toDto(roomTypeRepository.findById(id).get());
        if (null != roomTypeDTO){
            if (type == 1L){
                roomTypeDTO.setPrice(roomTypeDTO.getHourPrice());
            }else if (type == 2L){
                roomTypeDTO.setPrice(roomTypeDTO.getDayPrice());
            }else if (type == 3L){
                roomTypeDTO.setPrice(roomTypeDTO.getNightPrice());
            }
        }
        return roomTypeDTO;
    }

    @Override
    public RoomTypeDTO findByCode(String code) {
        return null;
    }

    @Override
    public List<RoomTypeDTO> getRomtype() {
        List<RoomTypeEntity> list = roomTypeRepository.findAll();
        List<RoomTypeDTO> assetDTOList = new ArrayList<>();
        for (RoomTypeEntity item: list) {
            assetDTOList.add(convertEntitytoDTO(item));
        }
        return assetDTOList;
    }


    public List<RoomTypeDTO> getAll() {
        return roomTypeMapper.toDto(roomTypeRepository.findAll());
    }

    public RoomTypeDTO convertEntitytoDTO(RoomTypeEntity roomEntity) {
        RoomTypeDTO dto = new RoomTypeDTO();
        dto.setRoomTypeId(roomEntity.getRoomTypeId());
        dto.setCode(roomEntity.getCode());
        dto.setName(roomEntity.getName());
        dto.setDayPrice(roomEntity.getDayPrice());
        dto.setHourPrice(roomEntity.getHourPrice());
        dto.setStatus(roomEntity.getStatus());
        dto.setNote(roomEntity.getNote());
        dto.setNightPrice(roomEntity.getNightPrice());
        return dto;
    }
}

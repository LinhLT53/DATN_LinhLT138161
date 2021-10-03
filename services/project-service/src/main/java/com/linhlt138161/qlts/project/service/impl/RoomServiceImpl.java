package com.linhlt138161.qlts.project.service.impl;

import com.linhlt138161.qlts.project.dto.AppParamDTO;
import com.linhlt138161.qlts.project.dto.RoomDTO;
import com.linhlt138161.qlts.project.dto.DataPage;
import com.linhlt138161.qlts.project.dto.RoomTypeDTO;
import com.linhlt138161.qlts.project.entity.*;
import com.linhlt138161.qlts.project.repository.customreporsitory.RoomCustomRepository;
import com.linhlt138161.qlts.project.repository.jparepository.AppParamRepository;
import com.linhlt138161.qlts.project.repository.jparepository.AssetRoomRepository;
import com.linhlt138161.qlts.project.repository.jparepository.BookingRoomRepository;
import com.linhlt138161.qlts.project.repository.jparepository.RoomRepository;
import com.linhlt138161.qlts.project.service.RoomService;
import com.linhlt138161.qlts.project.service.mapper.RoomMapper;
import common.CommonUtils;
import common.ErrorCode;
import exception.CustomExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service(value = "roomService")
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomCustomRepository roomCustomRepository;
    @Autowired
    private BookingRoomRepository bookingRoomRepository;
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    private RoomMapper roomMapper;
    @Autowired
    AppParamRepository appParamRepository;
    @Autowired
    AssetRoomRepository assetRoomRepository;
    @Override
    public DataPage<RoomDTO> searchAsser(RoomDTO dto) {
        DataPage<RoomDTO> dtoDataPage = new DataPage<>();
        dto.setPage(null != dto.getPage() ? dto.getPage().intValue() : 1);
        dto.setPageSize(null != dto.getPageSize() ? dto.getPageSize().intValue() : 10);
        List<RoomDTO> list = new ArrayList<>();
        try {
            list = roomCustomRepository.searchRoom(dto);
            dtoDataPage.setData(list);
        } catch (Exception e) {
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
    public DataPage<RoomDTO> onSearch(RoomDTO dto) {
        DataPage<RoomDTO> dtoDataPage = new DataPage<>();
        dto.setPage(null != dto.getPage() ? dto.getPage().intValue() : 1);
        dto.setPageSize(null != dto.getPageSize() ? dto.getPageSize().intValue() : 10);
        List<RoomDTO> list = new ArrayList<>();
        try {
            list = roomCustomRepository.onSearch(dto);
            for (RoomDTO roomDTO : list){
                BookingRoomEntity bookingRoomEntity = bookingRoomRepository.getByRoomBooking(roomDTO.getRoomId(), new Date());
                if (!CommonUtils.isEqualsNullOrEmpty(bookingRoomEntity)){
                    roomDTO.setBookingRoomId(bookingRoomEntity.getBookingroomId());
                }
            }
            dtoDataPage.setData(list);
        } catch (Exception e) {
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
    public List<RoomDTO> getAll() {
        return roomMapper.toDto(roomRepository.findAllRoom());
    }
    @Override
    public List<RoomDTO> getRomlist() {
        List<RoomEntity> list = roomRepository.findAlllist();
        List<RoomDTO> assetDTOList = new ArrayList<>();
        for (RoomEntity item: list) {
            assetDTOList.add(convertEntitytoDTO(item));
        }
        return assetDTOList;
    }
    @Override
    public List<AppParamDTO> getAllFloor() {
        List<AppParamEntity> list = appParamRepository.getAllFloor();
        List<AppParamDTO> dtos = new ArrayList<>();
        for (AppParamEntity item : list) {
            AppParamDTO appParamDTO = new AppParamDTO();
            appParamDTO.setId(item.getId());
            appParamDTO.setCode(item.getCode());
            appParamDTO.setName(item.getName());
            appParamDTO.setType(item.getType());
            appParamDTO.setIsActive(item.getIsActive());
            dtos.add(appParamDTO);
        }
        return dtos;

    }

    @Override
    public DataPage<RoomDTO> getPagePartSeach(RoomDTO dto) {
        return null;
    }

    @Override
    public RoomDTO create(RoomDTO dto) {
        RoomEntity roomEntity = roomRepository.findByID(dto.getRoomId());

        if (null != roomEntity && dto.getRoomId() == null) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        } else if (null != roomEntity) {
            //TODO: Update  phong
            roomEntity.setRoomId(Long.valueOf(dto.getRoomId()));
            roomEntity.setMaxNumber(dto.getMaxNumber());
            roomEntity.setRoomCode(dto.getRoomCode());
            roomEntity.setRoomName(dto.getRoomName());
            roomEntity.setFloorNumber(dto.getFloorNumber());
            roomEntity.setRoomType(dto.getRoomType());
            roomEntity.setNote(dto.getNote());
            roomEntity.setStatus(1);
            roomEntity.setPrice(dto.getPrice());
            roomEntity.setElevator(dto.getElevator());
            roomEntity.setTivi(dto.getTivi());
            roomEntity.setPet(dto.getPet());
            roomEntity.setPrice(dto.getPrice());
            roomEntity.setHumanRecourcesId(dto.getHumanResourcesId());
        } else if (dto.getRoomId() == null) {
            //TODO: create phong
            roomEntity = new RoomEntity();
            roomEntity.setMaxNumber(dto.getMaxNumber());
            roomEntity.setRoomCode(dto.getRoomCode());
            roomEntity.setRoomName(dto.getRoomName());
            roomEntity.setFloorNumber(dto.getFloorNumber());
            roomEntity.setRoomType(dto.getRoomType());
            roomEntity.setNote(dto.getNote());
            roomEntity.setStatus(1);
            roomEntity.setPrice(dto.getPrice());
            roomEntity.setElevator(dto.getElevator());
            roomEntity.setTivi(dto.getTivi());
            roomEntity.setPet(dto.getPet());
            roomEntity.setPrice(dto.getPrice());
            roomEntity.setHumanRecourcesId(dto.getHumanResourcesId());
        }
        roomRepository.save(roomEntity);
        for (Long i : assetRoomRepository.deleteroomID(roomEntity.getRoomId())) {
            assetRoomRepository.deleteById(i);
        }
        List<AssetRoomEntity> list = new ArrayList<>();
        for (Long item : dto.getAssetId()) {
            AssetRoomEntity assetRoomEntity = new AssetRoomEntity();
            assetRoomEntity.setAssetid(item);
            assetRoomEntity.setRoomid(roomEntity.getRoomId());
            assetRoomEntity.setIsActive(1);
            list.add(assetRoomEntity);
        }
        assetRoomRepository.saveAll(list);
        return convertEntitytoDTO(roomEntity);

    }

    @Override
    public RoomDTO update(RoomDTO partnerDTO) {
        return null;
    }

    @Override
    public RoomDTO delete(Long id) {
        RoomEntity roomEntity = roomRepository.findById(id).get();
        if (null == roomEntity) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        } else {
            roomEntity.setRoomId(Long.valueOf(roomEntity.getRoomId()));
            roomEntity.setStatus(0);
            roomRepository.save(roomEntity);

            return roomMapper.toDto(roomEntity);
        }
    }

    @Override
    public RoomDTO findById(Long Id) {
        RoomDTO dto = convertEntitytoDTO(roomRepository.findById(Id).get());
        dto.setAssetId(assetRoomRepository.findByroomID(Id));
        return dto;
    }

    @Override
    public RoomDTO findByCode(String code) {
        return null;
    }

    public RoomDTO convertEntitytoDTO(RoomEntity roomEntity) {
        RoomDTO dto = new RoomDTO();
        dto.setRoomId(roomEntity.getRoomId());
        dto.setRoomCode(roomEntity.getRoomCode());
        dto.setRoomName(roomEntity.getRoomName());
        dto.setMaxNumber(roomEntity.getMaxNumber());
        dto.setRoomType(roomEntity.getRoomType());
        dto.setStatus(roomEntity.getStatus());
        dto.setNote(roomEntity.getNote());
        dto.setFloorNumber(roomEntity.getFloorNumber());
        dto.setHumanResourcesId(roomEntity.getHumanRecourcesId());
        dto.setTivi(roomEntity.getTivi());
        dto.setElevator(roomEntity.getElevator());
        dto.setPrice(roomEntity.getPrice());
        dto.setPet(roomEntity.getPet());
        return dto;
    }
}

package com.linhlt138161.qlts.project.service.impl;

import com.linhlt138161.qlts.project.dto.AppParamDTO;
import com.linhlt138161.qlts.project.dto.DataPage;
import com.linhlt138161.qlts.project.dto.RoomDTO;
import com.linhlt138161.qlts.project.dto.tourDTO;
import com.linhlt138161.qlts.project.entity.RoomEntity;
import com.linhlt138161.qlts.project.entity.TourEntity;
import com.linhlt138161.qlts.project.repository.customreporsitory.tourCustomerRepository;
import com.linhlt138161.qlts.project.repository.jparepository.tourRepository;
import com.linhlt138161.qlts.project.service.mapper.TourService;
import common.ErrorCode;
import exception.CustomExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service(value = "tourService")
public class TourServiceImpl implements TourService {


    @Autowired
    tourCustomerRepository repository ;
    @Autowired
    tourRepository tRepository;
    @Override
    public DataPage<tourDTO> onSearch(tourDTO dto) {
        DataPage<tourDTO> dtoDataPage = new DataPage<>();
        dto.setPage(null != dto.getPage() ? dto.getPage().intValue() : 1);
        dto.setPageSize(null != dto.getPageSize() ? dto.getPageSize().intValue() : 10);
        List<tourDTO> list = new ArrayList<>();
        try {
            list = repository.searchTour(dto);
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
    public tourDTO create(tourDTO dto) {
        TourEntity entity = tRepository.findByID(dto.getIdtour());

        if (null != entity && dto.getIdtour() == null) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        } else if (null != entity) {
            //TODO: Update  tour
            entity.setIdtour(Long.valueOf(dto.getIdtour()));
            entity.setCode(dto.getCode());
            entity.setName(dto.getName());
            entity.setVenue(dto.getVenue());
            entity.setVehicle(dto.getVehicle());
            entity.setPrice(dto.getPrice());
            entity.setNote(dto.getNote());
            entity.setService((dto.getService()));
            entity.setStatus(1);
        } else if (dto.getIdtour() == null) {
            //TODO: create phong
            entity = new TourEntity();
            entity.setCode(dto.getCode());
            entity.setName(dto.getName());
            entity.setVenue(dto.getVenue());
            entity.setVehicle(dto.getVehicle());
            entity.setPrice(dto.getPrice());
            entity.setNote(dto.getNote());
            entity.setService((dto.getService()));
            entity.setStatus(1);
        }
        tRepository.save(entity);
        return convertEntitytoDTO(entity);
    }

    @Override
    public tourDTO update(tourDTO dto) {
        return null;
    }

    @Override
    public tourDTO delete(Long id) {
        tourDTO dto = convertEntitytoDTO(tRepository.findById(id).get());
        if (null == dto) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        } else {
            TourEntity entity = new TourEntity();
            entity.setIdtour(Long.valueOf(dto.getIdtour()));
            entity.setStatus(0);
            tRepository.save(entity);
            return dto;
        }
    }

    @Override
    public tourDTO findById(Long Id) {
        tourDTO dto = convertEntitytoDTO(tRepository.findById(Id).get());
        return dto;
    }

    @Override
    public tourDTO findByCode(String code) {
        return null;
    }


    @Override
    public List<tourDTO> getAll() {
        return null;
    }

    @Override
    public List<AppParamDTO> getAllFloor() {
        return null;
    }


    public tourDTO convertEntitytoDTO( TourEntity entity) {
        tourDTO dto = new tourDTO();
        dto.setIdtour(entity.getIdtour());
        dto.setCode(entity.getCode());
        dto.setName(entity.getName());
        dto.setVenue(entity.getVenue());
        dto.setVehicle(entity.getVehicle());
        dto.setPrice(entity.getPrice());
        dto.setNote(entity.getNote());
        dto.setService((entity.getService()));
        dto.setStatus(entity.getStatus());
        return dto;
    }
}

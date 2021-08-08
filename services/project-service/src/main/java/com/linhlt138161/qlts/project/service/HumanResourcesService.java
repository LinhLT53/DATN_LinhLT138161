package com.linhlt138161.qlts.project.service;

import com.linhlt138161.qlts.project.dto.*;
import com.linhlt138161.qlts.project.entity.HumanResourcesEntity;
import common.ResultResp;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface HumanResourcesService {
    List<HumanResourcesDTO> getListHumanResourceByNameOrCode(DTOSearch dto);

    HumanResourcesDTO getUserInfo(String username);

    ResultResp create(String username, HumanResourcesDTO humanResourcesDTO);

    void sendMailChangeEmail(HumanResourcesDTO humanResourcesDTO, HumanResourcesEntity oldEmail);

    HumanResourcesDTO update(HumanResourcesDTO humanResourcesDTO);

    DataPage<HumanResourcesShowDTO> getPageHumanResourcesSeach(HumanResourcesShowDTO dto);

    HumanResourcesDTO findById(Long Id);

    List<HistoryDTO> getHumanHistory();

    List<HistoryDTO> getHumanHistoryById(Long Id);

    HumanResourcesDTO findByCode(String code);

    List<HumanResourcesDTO> findByEmail(String email);

    HumanResourcesDTO getByEmail(String email);

    ResultResp resetPassword(Long userID, String usernameAdmin);

    void sendMailResetPassword(HumanResourcesDTO humanResourcesDTO, String password);

//    DataPage<HumanResourcesShowDTO> getPageHumanResourcesSeach(HumanResourcesShowDTO dto);

    Boolean deleteHumanResources(Long id,String name);

    Boolean lockHumanResources(Long id,String name);

    Integer getActiveFromHumanResourceId(Long id);

    List<HumanResourcesDTO> getHumanResources(DTOSearch dto);

    Long changePassword(HumanResourcesDTO humanResourcesDTO);

    Long checkPassword(HumanResourcesDTO humanResourcesDTO);

    List<HumanResourcesDTO> getListHumanResources(Long projectId);

    String getLeaderNameFromProject(Long projectId);

    byte[] importExcel(MultipartFile file) throws IOException;

    List<ICusTomDto> listAll();

    List<IPositionDTO> position();

    List<HumanResourcesDTO> getAll();

}

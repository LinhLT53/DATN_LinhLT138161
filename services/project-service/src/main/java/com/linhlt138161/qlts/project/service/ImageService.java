package com.linhlt138161.qlts.project.service;

import com.linhlt138161.qlts.project.controller.ImageController;
import com.linhlt138161.qlts.project.entity.ImageEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    ImageEntity creat(ImageEntity imageEntity);
    ImageEntity update(ImageEntity imageEntity);
    void  saveList(List<ImageEntity> list);
    void deleteImgDevice(Long id,Integer tyle);
    void deleteImgGroup(Long id,Integer tyle);
    boolean saveImgCreat(MultipartFile[] file, Long idevice, Long tyle) throws IOException;
    boolean updateLoad(MultipartFile[] file, Long idevice,Long tyle,List<String> data) throws IOException;
    List<String> getListDevice(Long id);
    List<ImageController.DeviceImageDto> getDevice(Long id, Long idGroup);
}

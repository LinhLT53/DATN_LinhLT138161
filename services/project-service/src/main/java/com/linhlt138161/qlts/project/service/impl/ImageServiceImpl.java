package com.linhlt138161.qlts.project.service.impl;

import com.linhlt138161.qlts.project.controller.ImageController;
import com.linhlt138161.qlts.project.entity.ImageEntity;
import com.linhlt138161.qlts.project.repository.jparepository.HistoryRepository;
import com.linhlt138161.qlts.project.repository.jparepository.ImageRepository;
import com.linhlt138161.qlts.project.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;




@Service(value = "imageService")
public class ImageServiceImpl implements ImageService {

    @Value("${pathLocal}")
    String pathLocal;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private HistoryRepository historyRepository;
    @Override
    public ImageEntity creat(ImageEntity imageEntity) {
        return imageRepository.save(imageEntity);
    }

    @Override
    public ImageEntity update(ImageEntity imageEntity) {
        return imageRepository.save(imageEntity);
    }

    @Override
    public void saveList(List<ImageEntity> list) {
        imageRepository.saveAll(list);
    }

    @Override
    public void deleteImgDevice(Long id, Integer tyle) {
        imageRepository.deleteByIdCodeAndAndTyle(id, tyle);
    }

    @Override
    public void deleteImgGroup(Long id, Integer tyle) {
        imageRepository.deleteByIdCodeAndAndTyle(id, tyle);
    }

    @Override
    public boolean saveImgCreat(MultipartFile[] file, Long idevice, Long tyle) throws IOException {
        List<ImageEntity> list = new ArrayList<>();
        for (MultipartFile multipartFile : file) {
            ImageEntity imageEntity = new ImageEntity();
            multipartFile.getContentType();
            Path path = Paths.get(pathLocal);
            String uniqueID = UUID.randomUUID().toString();
            String filename = multipartFile.getOriginalFilename();
            String pathLoca;
            assert filename != null;
            if (filename.substring(filename.lastIndexOf(".") + 1).equals("blob")) {
                pathLoca = uniqueID + "." + "png";
            } else {
                pathLoca = uniqueID + "." + filename.substring(filename.lastIndexOf(".") + 1);
            }

            Files.copy(multipartFile.getInputStream(), path.resolve(pathLoca));
            imageEntity.setDateAdd(new Date());
            imageEntity.setIdCode(idevice);
            imageEntity.setTyle(Integer.valueOf(tyle.toString()));
            imageEntity.setName(pathLoca);
            list.add(imageEntity);

        }
        imageRepository.saveAll(list);
        return true;
    }

    @Override
    @Transactional
    public boolean updateLoad(MultipartFile[] file, Long idevice, Long tyle, List<String> data) throws IOException {
        imageRepository.deleteByIdCodeAndAndTyle(idevice, Integer.valueOf(tyle.toString()));
        List<ImageEntity> list = new ArrayList<>();
        for (MultipartFile multipartFile : file) {
            ImageEntity imageEntity = new ImageEntity();
            multipartFile.getContentType();
            Path path = Paths.get(pathLocal);
            String uniqueID = UUID.randomUUID().toString();
            String filename = multipartFile.getOriginalFilename();
            String pathLoca;
            assert filename != null;
            if (filename.substring(filename.lastIndexOf(".") + 1).equals("blob")) {
                pathLoca = uniqueID + "." + "png";
            } else {
                pathLoca = uniqueID + "." + filename.substring(filename.lastIndexOf(".") + 1);
            }

            Files.copy(multipartFile.getInputStream(), path.resolve(pathLoca));
            imageEntity.setDateAdd(new Date());
            imageEntity.setIdCode(idevice);
            imageEntity.setTyle(Integer.valueOf(tyle.toString()));
            imageEntity.setName(pathLoca);
            list.add(imageEntity);
        }
        for (String s : data) {

            ImageEntity imageEntity = new ImageEntity();
            imageEntity.setDateAdd(new Date());
            imageEntity.setIdCode(idevice);
            imageEntity.setTyle(Integer.valueOf(tyle.toString()));
            imageEntity.setName(s);
            list.add(imageEntity);
        }
        imageRepository.saveAll(list);
        return true;
    }

    @Override
    public List<String> getListDevice(Long id) {
        return imageRepository.getListDeviceGruop(id, 2L);
    }

    @Override
    public List<ImageController.DeviceImageDto> getDevice(Long id, Long idGroup) {
        List<String> group = imageRepository.getListDeviceGruop(idGroup, 2L);
        List<String> device = imageRepository.getListDeviceGruop(id, 1L);
        List<ImageController.DeviceImageDto> list = new ArrayList<>();
        for (String s : group) {
            ImageController.DeviceImageDto dto = new ImageController.DeviceImageDto();
            dto.setGroup(true);
            dto.setUrl(s);
            list.add(dto);
        }
        for (String s : device) {
            ImageController.DeviceImageDto dto = new ImageController.DeviceImageDto();
            dto.setGroup(false);
            dto.setUrl(s);
            list.add(dto);
        }
        return list;
    }
}

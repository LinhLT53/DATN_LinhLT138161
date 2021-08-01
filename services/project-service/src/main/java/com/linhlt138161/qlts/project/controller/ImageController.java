package com.linhlt138161.qlts.project.controller;


import com.linhlt138161.qlts.project.service.ImageService;
import lombok.Data;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/img")
@CrossOrigin("*")
public class ImageController {
    @Autowired
    private ImageService imageService;
    @Value("${pathLocal}")
    String pathLocal;

    @RequestMapping(value = "/sid/{path}", method = RequestMethod.GET,
            produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable String path) throws IOException {
        File file = new File(pathLocal + path);

        byte[] dis = FileUtils.readFileToByteArray(file);
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(dis);
    }

    @PostMapping(value = "/updateImg/{tyle}/{idevice}")
    public ResponseEntity<?> getDataFile(@RequestParam("file") MultipartFile[] file, @RequestParam("data") List<String> stringList
            , @PathVariable Long idevice, @PathVariable Long tyle) throws IOException {

      imageService.updateLoad(file,idevice,tyle,stringList);

        return new ResponseEntity<>("Aaaa", HttpStatus.OK);
    }

    @PostMapping(value = "/uploadImg/{tyle}/{idevice}")
    public ResponseEntity<?> uploadImg(@RequestParam("file") MultipartFile[] file, @PathVariable Long idevice, @PathVariable Long tyle) throws IOException {

        imageService.saveImgCreat(file, idevice, tyle);
        return new ResponseEntity<>("Aaaa", HttpStatus.OK);
    }

    @GetMapping(value = "/getImgList")
    public ResponseEntity<?> getImgList(){
        return new ResponseEntity<>("ấ",HttpStatus.OK);
    }
    @GetMapping(value = "/deviceGroup/{id}")
    public ResponseEntity<?> getDeviceGroup( @PathVariable Long id){
        return new ResponseEntity<>(imageService.getListDevice(id),HttpStatus.OK);
    }
    @GetMapping(value = "/device/{id}/{idGroup}")
    public ResponseEntity<?> getDevice( @PathVariable Long id,@PathVariable Long idGroup){
        return new ResponseEntity<>(imageService.getDevice(id, idGroup),HttpStatus.OK);
    }

    @Data
    public static class DeviceImageDto{
        private boolean group;
        private String url;
    }
}

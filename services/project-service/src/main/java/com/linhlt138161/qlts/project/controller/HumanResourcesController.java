package com.thao.qlts.project.controller;

import com.thao.qlts.project.common.CoreUtils;
import com.thao.qlts.project.config.security.JWTProvider;
import com.thao.qlts.project.dto.DTOSearch;
import com.thao.qlts.project.dto.HumanResourcesDTO;
import com.thao.qlts.project.dto.HumanResourcesShowDTO;
import com.thao.qlts.project.service.AuthenService;
import com.thao.qlts.project.service.HumanResourcesService;
import common.CommonUtils;
import common.ErrorCode;
import common.ObjectError;
import common.ResultResp;
import exception.CustomExceptionHandler;
import org.apache.commons.io.IOUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Date;
import java.util.List;
import java.util.Objects;

//import org.jxls.reader.ReaderBuilder;
//import org.jxls.reader.XLSReader;


@RestController
@RequestMapping("/humanResources")
@CrossOrigin("*")
public class HumanResourcesController {
    private final Logger log = LogManager.getLogger(HumanResourcesController.class);

    @Autowired
    private HumanResourcesService resourcesService;

    @Autowired
    private AuthenService authenService;
    @Autowired
    private JWTProvider jwtProvider;

    //api
    @PostMapping("/getListUserByNameOrCode")
    public ResponseEntity<List<HumanResourcesDTO>> getListHumanResourceByNameOrCode(@RequestBody DTOSearch dto) {
        log.info("----------------api search auto complete nhan su-----------------");
        try {
            List<HumanResourcesDTO> result = resourcesService.getListHumanResourceByNameOrCode(dto);
            return new ResponseEntity(result, HttpStatus.OK);
        } catch (Exception ex) {
            log.error(ex);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/searchHumanResources")
    public ResponseEntity<List<HumanResourcesShowDTO>> searchHumanResources(@RequestBody HumanResourcesShowDTO dto) {
        log.info("----------------api searchHumanResources nhan su-----------------");
        try {
            log.info("----------------api searchHumanResources nhan su Ok-----------------");
            return new ResponseEntity(resourcesService.getPageHumanResourcesSeach(dto), HttpStatus.OK);
        } catch (Exception e) {
            log.info("----------------api searchHumanResources nhan su fail-----------------");
            throw e;
        }
    }
    // API GET thong tin user dang nhap
    @GetMapping("/getUserInfo")
    public ResponseEntity<HumanResourcesDTO> getUserInfo(@RequestParam("username") String username) {
        log.info("----------------api get thong tin nhan su----------------");
        return new ResponseEntity(resourcesService.getUserInfo(username), HttpStatus.OK);
    }

    /// khoa nhan su
//    @PreAuthorize("hasAnyRole('ROLE_ALL', 'ROLE_ADMINPART')")
    @DeleteMapping("/lockHumanResources/{id}")
    public ResultResp lockProject(@PathVariable("id") Long id ,HttpServletRequest request) {
        String username = authenService.getEmailCurrentlyLogged(request);
        log.info("----------------api delete nhan su-----------------");
        try {
            log.info("----------------api delete nhan su Ok-----------------");
            if (resourcesService.lockHumanResources(id,username)) {
                if (resourcesService.getActiveFromHumanResourceId(id) == 2) {
                    log.info("<--- DELETE HUMAN_RESOURCES COMPLETE");
                    return ResultResp.success(ErrorCode.DELETE_HR_OK);
                } else if (resourcesService.getActiveFromHumanResourceId(id) == 1) {
                    log.info("<--- UNLOCK HUMAN_RESOURCES COMPLETE");
                    return ResultResp.success(ErrorCode.UNLOCK_HR_OK);
                }
            } else {
                log.error("<--- DELTE HUMAN_RESOURCES FAIL, HAVE ASSOCIATION");
                return ResultResp.badRequest(ErrorCode.DELETE_HR_FAIL);
            }
        } catch (CustomExceptionHandler e) {
            log.info("----------------api delete nhan su faile-----------------");
            return ResultResp.badRequest(ErrorCode.DELETE_HR_FAIL);
        }
        return ResultResp.badRequest(ErrorCode.DELETE_HR_FAIL);
    }

    // Xoa nhan su
//    @PreAuthorize("hasAnyRole('ROLE_ALL', 'ROLE_ADMINPART')")
    @DeleteMapping("/deleteHumanResources/{id}")
    public ResultResp deleteProject(@PathVariable("id") Long id,HttpServletRequest request) {
        String username = authenService.getEmailCurrentlyLogged(request);
        log.info("----------------api delete nhan su-----------------");
        try {
            if (resourcesService.deleteHumanResources(id,username)) {
                log.info("----------------api delete nhan su Ok-----------------");
                return ResultResp.success(ErrorCode.DELETE_HR_OK);
            } else {
                log.error("<--- DELTE HUMAN_RESOURCES FAIL, HAVE ASSOCIATION");
                return ResultResp.badRequest(ErrorCode.DELETE_HR_FAIL);
            }
        } catch (CustomExceptionHandler e) {
            log.info("----------------api delete nhan su faile-----------------");
            return ResultResp.badRequest(ErrorCode.DELETE_HR_FAIL);
        }
    }

    @GetMapping("/getPosition")
    public ResultResp getHumanPosition() {
        return ResultResp.success(resourcesService.position());
    }

    // get thong tin nhan su
    @PostMapping("/getHumanResources")
    public ResponseEntity<List<HumanResourcesDTO>> getAppParam(@RequestBody DTOSearch dto) {
        return new ResponseEntity<>(resourcesService.getHumanResources(dto), HttpStatus.OK);
    }

    // đoi mật khẩu
//    @PreAuthorize("hasAnyRole('ROLE_ALL', 'ROLE_ADMINPART')")
    @PutMapping("/reset-password/{id}")
    public ResultResp resetPassword(@PathVariable("id") Long humanResourceID, HttpServletRequest req) {
        //lấy ra username đang đăng nhập
        String username= authenService.getEmailCurrentlyLogged(req);
        log.info("<--- USERNAME FROM TOKEN" + username);
        log.info("<--- Reset Password HumanResource Start!");
        return resourcesService.resetPassword(humanResourceID, username);
    }

    //end TanNV
    @PostMapping(value = "/check-password")
    public ResultResp checkPassword(@RequestBody HumanResourcesDTO humanResourcesDTO) {
        log.info("<-- api check password: start, ");
        try {
            return ResultResp.success(resourcesService.checkPassword(humanResourcesDTO));
        } catch (CustomExceptionHandler e) {
            log.error("<--- api updateHumanResources: error, ");
            return ResultResp.badRequest(ErrorCode.OLD_PASSWORD_FAILE);
        }
    }
    @PutMapping("/changePassword")
    public ResultResp changePasswordHumanResouces(@RequestBody HumanResourcesDTO humanResourcesDTO) {
        try {
            Long id = resourcesService.changePassword(humanResourcesDTO);
            return ResultResp.success(ErrorCode.UPDATED_OK);
        } catch (CustomExceptionHandler e) {
            if (e.getMsgCode().equalsIgnoreCase("sai_password")) {
                return ResultResp.badRequest(ErrorCode.OLD_PASSWORD_FAILE);
            }
            return ResultResp.badRequest(new ObjectError("BK014", " Nhập lại mật khẩu không khớp"));
        } catch (Exception e) {
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }
    }

    @GetMapping("/getDepartment")
    public ResultResp getDepartment() {
        return ResultResp.success(null);
    }

    @GetMapping("/getMajor")
    public ResultResp getHumanMajor() {
        return ResultResp.success(null);
    }

    @PostMapping("/add")
    public ResultResp createHR(@RequestBody HumanResourcesDTO humanResourcesDTO, HttpServletRequest request) {
        String username = authenService.getEmailCurrentlyLogged(request);
        try {
            return resourcesService.create(username,humanResourcesDTO);
        } catch (CustomExceptionHandler e) {
            return ResultResp.serverError(new ObjectError("HR004","Có lỗi từ server"));
        }
    }
    @PutMapping(value = "/update")
    public ResultResp updateHr(@RequestBody HumanResourcesDTO humanResourcesDTO) {
        log.info("<-- api updateHumanResources: start, ", humanResourcesDTO);
        try {
            return ResultResp.success(ErrorCode.UPDATED_OK, resourcesService.update(humanResourcesDTO));
        } catch (Exception e) {
            log.error("<--- api updateHumanResources: error, ");
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }
    }
    @GetMapping(value = "/check-email/{email}")
    public ResultResp checkEmail(@PathVariable("email") String email) {
        log.info("<-- api check duplicate Email: start, ");
        try {
            return ResultResp.success(resourcesService.findByEmail(email));

        } catch (CustomExceptionHandler e) {
            log.error("<--- api updateHumanResources: error, ");
            return ResultResp.badRequest(ErrorCode.EMAIL_IS_EXIST);
        }
    }
    @GetMapping(value = "/check-usercode/{code}")
    public ResultResp checkUsername(@PathVariable("code") String code) {
        log.info("<-- api check duplicate code: start, ");
        try {
            return ResultResp.success(resourcesService.findByCode(code));
        } catch (CustomExceptionHandler e) {
            log.error("<--- api updateHumanResources: error, ");
            return ResultResp.badRequest(ErrorCode.CREATED_HR_EXIST);
        }
    }
    @GetMapping("/get-human-by-id/{id}")
    public ResultResp getOneById(@PathVariable("id") Long id) {
        log.info("<-- api updateHumanResources: start, ", id);
        try {
            return ResultResp.success(resourcesService.findById(id));
        } catch (CustomExceptionHandler e) {
            return ResultResp.badRequest(ErrorCode.USERNAME_NOT_FOUND);
        } catch (Exception e) {
            log.error("<--- api find HumanResources: error, ");
            e.printStackTrace();
            return ResultResp.badRequest(ErrorCode.SERVER_ERROR);
        }
    }
    @GetMapping("/getHumanResources/{projectId}")
    public ResultResp getListHumanResources(@PathVariable("projectId") Long projectId) {
        try {
            return ResultResp.success(resourcesService.getListHumanResources(projectId));
        } catch (CustomExceptionHandler ex) {
            return ResultResp.badRequest((ObjectError) ex.getData());
        }
    }
    @GetMapping("/getLeader/{projectId}")
    public ResultResp getLeaderFromProject(@PathVariable("projectId") Long projectId) {
        try {
            return ResultResp.success(resourcesService.getLeaderNameFromProject(projectId));
        } catch (CustomExceptionHandler ex) {
            return ResultResp.badRequest((ObjectError) ex.getData());
        }
    }

    @GetMapping("/dowloadfiledata")
    public ResponseEntity<?> getFileForm() {
        byte[] bytes = null;
        try {
            String file1 = "/templates/IMPORT_DanhSachNhanSu.xlsx";
            InputStream inputStream = new ClassPathResource(file1).getInputStream();
            bytes = IOUtils.toByteArray(inputStream);

            HttpHeaders headers = new HttpHeaders();

            String fileName = CommonUtils.getFileNameReportUpdate("IMPORT_DanhSachNhanSu");

            headers.add("File", fileName);
            headers.add("Content-Disposition", "attachment; filename=" + fileName);
            headers.add("Access-Control-Expose-Headers", "File");
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(bytes);

        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        }
    }

    /*@GetMapping("/getHumanResources/{projectId}")
    public ResultResp getListHumanResources(@PathVariable("projectId") Long projectId){
        try{
            return ResultResp.success(resourcesService.getListHumanResources(projectId));
        }catch (CustomExceptionHandler ex){
            return ResultResp.badRequest((ObjectError) ex.getData());
        }
    }*/

    @RequestMapping(value = "/doImport", method = RequestMethod.POST)
    public ResponseEntity<?> importExcel(@RequestParam("file") MultipartFile file) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        byte[] result = resourcesService.importExcel(file);
        if (!Objects.isNull(result)) {
            String fileNameExcel = "KQ_IMPORT_NHAN_SU" +
                    CoreUtils.castDateToStringByPattern(new Date(), "yyMMdd") + "_" +
                    CoreUtils.castDateToStringByPattern(new Date(), "hhmmss") + ".xlsx";
            headers.add("File", fileNameExcel);
//            headers.add("totalRecord", String.valueOf(result.getTotalRecord()));
//            headers.add("successRecord", String.valueOf(result.getImportSuccessRecord()));
            headers.add("Content-Disposition", "attachment; filename=" + fileNameExcel);
            headers.add("Access-Control-Expose-Headers", "File");
            headers.add("Access-Control-Expose-Headers", "totalRecord");
            headers.add("Access-Control-Expose-Headers", "successRecord");
            return ResponseEntity.ok().headers(headers).body(result);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/codeOrName")
    public ResponseEntity<?> getCodeName(){
        return new ResponseEntity<>(resourcesService.listAll(),HttpStatus.OK);
    }
}
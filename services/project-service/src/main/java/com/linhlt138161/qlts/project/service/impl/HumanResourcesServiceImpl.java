package com.linhlt138161.qlts.project.service.impl;

import com.linhlt138161.qlts.project.dto.*;
import com.linhlt138161.qlts.project.entity.HumanResourcesEntity;
import com.linhlt138161.qlts.project.repository.customreporsitory.HumanResourcesCustomRepository;
import com.linhlt138161.qlts.project.repository.jparepository.HumanResourcesRepository;
import com.linhlt138161.qlts.project.repository.jparepository.PositionRepository;
import com.linhlt138161.qlts.project.service.HumanResourcesService;
import com.linhlt138161.qlts.project.service.mapper.HumanResourcesMapper;
import common.*;
import exception.CustomExceptionHandler;
import org.apache.commons.collections.CollectionUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service(value = "humanResourcesService")
public class HumanResourcesServiceImpl implements HumanResourcesService, UserDetailsService {
    private final Logger log = LogManager.getLogger(HumanResourcesServiceImpl.class);
    @Autowired
    private HumanResourcesRepository repository;
    @Autowired
    private BCryptPasswordEncoder passwordEncode;
    @Autowired
    private PositionRepository positionRepository;
    @Autowired
    private HumanResourcesMapper humanResourcesMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private HumanResourcesCustomRepository customRepository;
    @Override
    public List<HumanResourcesDTO> getListHumanResourceByNameOrCode(DTOSearch dto) {
        return null;
    }
    @Override
    public HumanResourcesDTO getUserInfo(String username) {
        HumanResourcesEntity humanResourcesEntity = repository.findByEmail2(username);
        HumanResourcesDTO humanResourcesDTO = new HumanResourcesDTO();
        BeanUtils.copyProperties(humanResourcesEntity, humanResourcesDTO);
        return humanResourcesDTO;
    }
    @Override
    public List<IPositionDTO> position() {
        return positionRepository.getPosition();
    }

    @Override
    public List<HumanResourcesDTO> getAll() {
        List<HumanResourcesDTO> listAll = humanResourcesMapper.toDto(repository.findByAll());
        return listAll;
    }

    @Override
    public ResultResp create(String username, HumanResourcesDTO humanResourcesDTO) {
        if (CommonUtils.isEqualsNullOrEmpty(humanResourcesDTO.getHumanResourceId())){
            log.info("Create Humanresources, "+humanResourcesDTO.getFullName());
            HumanResourcesEntity entity = humanResourcesMapper.toEntity(humanResourcesDTO);
            repository.save(entity);
            log.info("create humanresources success");
            return ResultResp.success(new ObjectSuccess("HR001","Thêm mới nhân sự thành công"));
        }else {
            HumanResourcesEntity curr = repository.findById(humanResourcesDTO.getHumanResourceId()).get();
            if (CommonUtils.isEqualsNullOrEmpty(curr)){
                return ResultResp.serverError(new ObjectError("HR002","Không tồn tại nhân sự trong hệ thống"));
            }else {
                log.info("update information HR, "+curr.getFullName());
                HumanResourcesEntity entity = humanResourcesMapper.toEntity(humanResourcesDTO);
                entity.setUsername(curr.getUsername());
                entity.setPassword(curr.getPassword());
                entity.setIsNew(curr.getIsNew());
                entity.setVerifyKey(curr.getVerifyKey());
                repository.save(entity);
                log.info("update information HR success");
                return ResultResp.success(new ObjectSuccess("HR003","Cập nhật thông tin nhân sự thành công"));
            }
        }
    }
    @Override
    public void sendMailChangeEmail(HumanResourcesDTO humanResourcesDTO, HumanResourcesEntity oldEmail) {
    }
    @Override
    public HumanResourcesDTO update(HumanResourcesDTO humanResourcesDTO) {
        return null;
    }

    @Override
    public DataPage<HumanResourcesShowDTO> getPageHumanResourcesSeach(HumanResourcesShowDTO dto) {
        DataPage<HumanResourcesShowDTO> data = new DataPage<>();
        dto.setPage(null != dto.getPage() ? dto.getPage().intValue() : 1);
        dto.setPageSize(null != dto.getPageSize() ? dto.getPageSize().intValue() : 10);
        List<HumanResourcesShowDTO> listProject;
        if (CollectionUtils.isNotEmpty(customRepository.getlistHumanResources(dto))) {
            listProject = customRepository.getlistHumanResources(dto);
            data.setData(listProject);
        }
        data.setPageIndex(dto.getPage());
        data.setPageSize(dto.getPageSize());
        data.setDataCount(dto.getTotalRecord());
        data.setPageCount(dto.getTotalRecord() / dto.getPageSize());
        if (data.getDataCount() % data.getPageSize() != 0) {
            data.setPageCount(data.getPageCount() + 1);
        }
        return data;
    }

    @Override
    public HumanResourcesDTO findById(Long Id) {
        if (!repository.findById(Id).isPresent()) {
            throw new CustomExceptionHandler(ErrorCode.USERNAME_NOT_FOUND.getCode(), HttpStatus.BAD_REQUEST);
        }
        if(!repository.findById(Id).isPresent()){
            return null;
        }
        HumanResourcesEntity entity = repository.findById(Id).get();
        HumanResourcesDTO dto = humanResourcesMapper.toDto(repository.findById(Id).get());
        return humanResourcesMapper.toDto(repository.findById(Id).get());
    }

    @Override
    public List<HistoryDTO> getHumanHistory() {
        return null;
    }

    @Override
    public List<HistoryDTO> getHumanHistoryById(Long Id) {
        return null;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW,
            rollbackFor = CustomExceptionHandler.class)
    public HumanResourcesDTO findByCode(String code) {
        if (null != repository.findByCode(code)) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_EXIST.getCode(), HttpStatus.BAD_REQUEST);
        }
        return humanResourcesMapper.toDto(repository.findByCode(code));
    }

    @Override
    public List<HumanResourcesDTO> findByEmail(String email) {
        if (!repository.findByEmail(email).isEmpty()) {
            throw new CustomExceptionHandler(ErrorCode.EMAIL_IS_EXIST.getCode(), HttpStatus.BAD_REQUEST);
        }
        return humanResourcesMapper.toDto(repository.findByEmail(email));
    }

    @Override
    public HumanResourcesDTO getByEmail(String email) {
        return null;
    }

    @Override
    public ResultResp resetPassword(Long humanResourceID, String usernameAdmin) {
        log.info("---> RESET PASSWORD: UserID " + humanResourceID + " confirm reset password START");
        HumanResourcesEntity humanResource = repository.findById(humanResourceID).get();
        String olPassWord = humanResource.getPassword();
        // generate random password
        String SALTCHARS = "ABCDEefgh!@ijklFGH123IJKL!@#$MNOPQRS012345TUVWXYZabcdmnopqrstuvwxyz6789%^&*";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 15) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        try {
            humanResource.setPassword(passwordEncode.encode(saltStr));
        } catch (Exception ex) {
            log.error("<--- Reset Password Fail by Error: ", ex.getMessage());
            ex.printStackTrace();
        }
        repository.save(humanResource);
        log.info("<--- Reset Password Complete");
        log.info("<--- Send email notification to user start!");
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            message.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress(humanResource.getEmail()));
            message.setSubject("THÔNG TIN TÀI KHOẢN HỆ THỐNG QUẢN LÝ KHÁCH SẠN", "UTF-8");
            String subject = "Kính gửi anh/chị,\n\n" +
                    "Hệ thống Quản lý khách sạn của khách sạn Hoàng Mai gửi đến anh chị thông tin như sau:\n" +
                    "Anh/chị đã được reset mậu khẩu:\n" +
                    "Link truy cập hệ thống:" + Constants.URL_WEBAPP + "\n" +
                    "Họ và tên: " + humanResource.getFullName() + "\n" +
                    "Tên đăng nhập: " + humanResource.getEmail() + "\n" +
                    "Mật khẩu mới: " + saltStr + "\n\n" +
                    "Trân trọng!";
            message.setText(subject, "UTF-8");
            javaMailSender.send(message);
            log.info("<--- Send email success!");
            return ResultResp.success(humanResource);
        } catch (MessagingException | MailException ex) {
            ex.printStackTrace();
            log.error("Send email notification fail by Error ", ex.getMessage());
            return ResultResp.badRequest(ErrorCode.RESET_PASSWORD_FAIL);
        }
    }

    @Override
    public void sendMailResetPassword(HumanResourcesDTO humanResourcesDTO, String password) {

    }

    @Override
    public Boolean deleteHumanResources(Long id, String name) {
        log.info("-----------------Xoa nhan su---------------");
        if (id != null) {
            HumanResourcesEntity humanResourcesEntity = repository.findByHumanResourceId(id);
            humanResourcesEntity.setStatus(3);
            repository.save(humanResourcesEntity);
            log.info("<--- DELETE HUMAN_RESOURCES COMPLETE");
            return true;
        }
        return false;
    }

    @Override
    public Boolean lockHumanResources(Long id, String name) {
        log.info("-----------------khoa nhan su---------------");
        if (id != null) {
            HumanResourcesEntity humanResourcesEntity = repository.findByHumanResourceId(id);
            if (humanResourcesEntity.getStatus() == 2) {
                humanResourcesEntity.setStatus(1);
                repository.save(humanResourcesEntity);
                log.info("<--- Unlock Human Resources with id = " + id);
                return true;
            } else if (humanResourcesEntity.getStatus() == 1) {
                humanResourcesEntity.setStatus(2);
                repository.save(humanResourcesEntity);
                log.info("<--- LOCK HUMAN_RESOURCES COMPLETE");
                return true;
            }
        }
        return false;
    }

    @Override
    public Integer getActiveFromHumanResourceId(Long id) {
        if(!repository.findById(id).isPresent()){
            return null;
        }
        return repository.findById(id).get().getStatus();
    }

    @Override
    public List<HumanResourcesDTO> getHumanResources(DTOSearch dto) {
        List<HumanResourcesDTO> HumanResourcesList = customRepository.getHumanResources(dto);
        if (CollectionUtils.isNotEmpty(HumanResourcesList)) {
            return HumanResourcesList;
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public Long changePassword(HumanResourcesDTO humanResourcesDTO) {
        String password = humanResourcesDTO.getPassword();
        String newPassword = humanResourcesDTO.getNewPassword();
        String newPasswordConfirm = humanResourcesDTO.getNewPasswordConfirm();
        if (!newPassword.equals(newPasswordConfirm)) {
            throw new CustomExceptionHandler("khong_trung", HttpStatus.BAD_REQUEST);
        }
        try {
            HumanResourcesEntity entity = repository.findByUsername(humanResourcesDTO.getUsername());
            if (!BCrypt.checkpw(password, entity.getPassword())) {
                throw new CustomExceptionHandler("sai_password", HttpStatus.BAD_REQUEST);
            }
            entity.setPassword(passwordEncoder.encode(newPassword));
            entity.setIsNew(common.Constants.IS_NOT_NEW);
            log.info("update password");
            HumanResourcesEntity result = repository.save(entity);
            log.info("doi pass thanh cong");
            return result.getHumanResourceId();
        } catch (Exception ex) {
            log.error("doi khong duoc", ex);
            throw ex;
        }
    }

    @Override
    public Long checkPassword(HumanResourcesDTO humanResourcesDTO) {
        return null;
    }

    @Override
    public List<HumanResourcesDTO> getListHumanResources(Long projectId) {
        List<HumanResourcesDTO> listDTO = humanResourcesMapper.toDto(repository.getListHumanResources(projectId));
        return listDTO;
    }

    @Override
    public String getLeaderNameFromProject(Long projectId) {
        return null;
    }

    @Override
    public byte[] importExcel(MultipartFile file) throws IOException {
        return new byte[0];
    }

    @Override
    public List<ICusTomDto> listAll() {
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        HumanResourcesEntity humanResourcesEntity = repository.findByEmail2(email);
        if (humanResourcesEntity == null) {
            throw new CustomExceptionHandler(ErrorCode.USERNAME_NOT_FOUND.getCode(), HttpStatus.UNAUTHORIZED);
        }
        List<GrantedAuthority> roleList = new ArrayList<>();
//        roleList.add(new SimpleGrantedAuthority(humanResourcesEntity.getRole()));
        humanResourcesEntity.setAuthorities(roleList);
        return new org.springframework.security.core.userdetails.User(humanResourcesEntity.getEmail(), humanResourcesEntity.getPassword(), humanResourcesEntity.getAuthorities());
    }


}

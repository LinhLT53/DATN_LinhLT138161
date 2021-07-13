package com.thao.qlts.project.service.impl;

import com.thao.qlts.project.dto.CustomerDTO;
import com.thao.qlts.project.dto.DataPage;
import com.thao.qlts.project.entity.CustomerEntity;
import com.thao.qlts.project.repository.customreporsitory.CustomerRepositoryy;
import com.thao.qlts.project.repository.jparepository.CustomerRepository;
import com.thao.qlts.project.service.CustomerService;
import com.thao.qlts.project.service.mapper.CustomerMapper;
import common.ErrorCode;
import exception.CustomExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "customerService")
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository repository;
    @Autowired
    private CustomerMapper customerMapper;
    @Autowired
    private CustomerRepositoryy customerRepository;
    @Override
    public List<CustomerDTO> getAllCustomer() {
        return customerMapper.toDto(repository.findAllCustomer());
    }

    @Override
    public CustomerDTO delete(Long id) {
        CustomerDTO dto = convertEntitytoDTO(repository.findById(id).get());
        if (null == dto) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        } else {
            CustomerEntity customerEntity = new CustomerEntity();
            customerEntity.setCustomerId(Long.valueOf(dto.getCustomerId()));
            customerEntity.setStatus(0);
            repository.save(customerEntity);
            return dto;
        }
    }

    @Override
    public CustomerDTO findById(Long Id) {
        CustomerDTO dto = convertEntitytoDTO(repository.findById(Id).get());
        return dto;
    }

    @Override
    public DataPage<CustomerDTO> searchCustomer(CustomerDTO dto) {
        DataPage<CustomerDTO> dataPage = new DataPage<>();
        dto.setPage(null != dto.getPage() ? dto.getPage().intValue() : 1);
        dto.setPageSize(null != dto.getPageSize() ? dto.getPageSize().intValue() : 10);
        List<CustomerDTO> list = new ArrayList<>();
        try {
            list = customerRepository.searchCustomer(dto);
            dataPage.setData(list);
        } catch (Exception e) {
            throw e;
        }
        dataPage.setPageIndex(dto.getPage());
        dataPage.setPageSize(dto.getPageSize());
        dataPage.setDataCount(dto.getTotalRecord());
        dataPage.setPageCount(dto.getTotalRecord() / dto.getPageSize());
        if (dataPage.getDataCount() % dataPage.getPageSize() != 0) {
            dataPage.setPageCount(dataPage.getPageCount() + 1);
        }
        return dataPage;
    }

    @Override
    public CustomerDTO create(CustomerDTO dto) {
        CustomerEntity customerEntity = repository.findByID(dto.getCustomerId());

        if (null != customerEntity && dto.getCustomerId() == null) {
            throw new CustomExceptionHandler(ErrorCode.CREATED_HR_FALSE.getCode(), HttpStatus.BAD_REQUEST);
        } else if (null != customerEntity) {
            //TODO: Update  khach hang
            customerEntity.setCustomerId(Long.valueOf(dto.getCustomerId()));
            customerEntity.setFullname(dto.getFullname());
            customerEntity.setCmt(dto.getCmt());
            customerEntity.setPhoneNumber(dto.getPhoneNumber());
            customerEntity.setAddress(dto.getAddress());
            customerEntity.setEmail(dto.getEmail());
            customerEntity.setStatus(1);
        } else if (dto.getCustomerId() == null) {
            //TODO: create phong
            customerEntity = new CustomerEntity();
            customerEntity.setFullname(dto.getFullname());
            customerEntity.setCmt(dto.getCmt());
            customerEntity.setPhoneNumber(dto.getPhoneNumber());
            customerEntity.setAddress(dto.getAddress());
            customerEntity.setEmail(dto.getEmail());
            customerEntity.setStatus(1);
        }
        repository.save(customerEntity);

        return convertEntitytoDTO(customerEntity);

    }
    public CustomerDTO convertEntitytoDTO(CustomerEntity customerEntity) {
        CustomerDTO dto = new CustomerDTO();
        dto.setCustomerId(customerEntity.getCustomerId());
        dto.setFullname(customerEntity.getFullname());
        dto.setPhoneNumber(customerEntity.getPhoneNumber());
        dto.setEmail(customerEntity.getEmail());
        dto.setAddress(customerEntity.getAddress());
        dto.setStatus(customerEntity.getStatus());
        dto.setCmt(customerEntity.getCmt());
        return dto;
    }
}
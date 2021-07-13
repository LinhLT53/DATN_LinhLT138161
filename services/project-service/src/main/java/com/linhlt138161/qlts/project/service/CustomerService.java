package com.linhlt138161.qlts.project.service;

import com.linhlt138161.qlts.project.dto.CustomerDTO;
import com.linhlt138161.qlts.project.dto.DataPage;

import java.util.List;

public interface CustomerService {
    List<CustomerDTO> getAllCustomer();
    DataPage<CustomerDTO> searchCustomer(CustomerDTO dto);
    CustomerDTO create(CustomerDTO dto);
    CustomerDTO findById(Long Id);
    CustomerDTO delete (Long id);
}

package com.thao.qlts.project.dto;

import lombok.Data;

import java.util.List;

@Data
public class DTOSearch {
    private String keySearch;
    private String type; // code vi tri
    private List<Long> listHumanResources; // code vi tri
    private Long isSearchByCodeAndFullname;
}

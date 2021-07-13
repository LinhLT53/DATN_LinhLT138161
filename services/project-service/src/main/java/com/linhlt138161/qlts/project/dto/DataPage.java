package com.thao.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataPage<T> implements Serializable {
    private int pageIndex;
    private int pageSize;
    private long pageCount;
    private long dataCount;
    private List<T> data;
}

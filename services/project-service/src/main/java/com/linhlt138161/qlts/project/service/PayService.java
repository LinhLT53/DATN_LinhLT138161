package com.thao.qlts.project.service;

import com.thao.qlts.project.dto.ChartDto;
import com.thao.qlts.project.dto.PayDto;

import java.util.List;

public interface PayService {
    PayDto getServiceRoom(Long bookRoomId);
    boolean billBookroom(PayDto payDto);
    List<ChartDto> getList(List<Integer> quy, Integer nam);
}

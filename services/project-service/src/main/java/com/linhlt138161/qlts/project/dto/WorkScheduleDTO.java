package com.linhlt138161.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class WorkScheduleDTO {
    private Long workScheduleId;

    private Long employeeId;

    private Long taskId;

    private Date startTime;

    private Date finishTime;

    private Integer cleanRoom;
}

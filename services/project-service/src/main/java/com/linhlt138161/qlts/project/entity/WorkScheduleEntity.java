package com.linhlt138161.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name ="work_schedule")
@AllArgsConstructor
@NoArgsConstructor
public class WorkScheduleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "work_schedule_id")
    private Long workScheduleId;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "task_id")
    private Long taskId;

    @Column(name = "start_time")
    private Date startTime;

    @Column(name = "finish_time")
    private Date finishTime;

    @Column(name = "clean_room")
    private Integer cleanRoom;
}

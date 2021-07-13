package com.linhlt138161.qlts.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

/**
 * @author nuctv
 * @since 13 ,8/7/2020 , 2020
 */
@EnableScheduling
@Configuration
public class ConfigSchedule implements SchedulingConfigurer {
    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        taskRegistrar.setScheduler(taskExecutorScheduleCustomMove());
    }
    @Bean(destroyMethod = "shutdown")
    public Executor taskExecutorScheduleCustomMove(){
        return Executors.newScheduledThreadPool(6);
    }
}

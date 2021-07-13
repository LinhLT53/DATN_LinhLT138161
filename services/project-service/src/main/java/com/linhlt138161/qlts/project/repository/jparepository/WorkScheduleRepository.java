package com.thao.qlts.project.repository.jparepository;

import com.thao.qlts.project.entity.WorkScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkScheduleRepository extends JpaRepository<WorkScheduleEntity, Long> {
}

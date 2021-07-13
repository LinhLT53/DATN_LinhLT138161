package com.linhlt138161.qlts.project.repository.jparepository;

import com.linhlt138161.qlts.project.entity.AppParamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppParamRepository extends JpaRepository<AppParamEntity, Long> {
    @Query(value = "select * from app_params ", nativeQuery = true)
    List<AppParamEntity> getAllFloor();
}

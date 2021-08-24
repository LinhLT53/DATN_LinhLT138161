package com.linhlt138161.qlts.project.repository.jparepository;

import com.linhlt138161.qlts.project.entity.ServiceDutyEntity;
import com.linhlt138161.qlts.project.entity.promotionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ServiceDutyResponsitory  extends JpaRepository<ServiceDutyEntity, Long > {

    List<ServiceDutyEntity> findByServicecode(String servicecode);
    @Query(value = "select * from service_duty where id=?1 and STATUS= 1 ", nativeQuery = true)
    ServiceDutyEntity findByID(Long id);

}

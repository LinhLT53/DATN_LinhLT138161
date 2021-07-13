package com.thao.qlts.project.repository.jparepository;

import com.thao.qlts.project.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    @Query(value = "select * from service where code=?1 and status= 1 ", nativeQuery = true)
    ServiceEntity findByCode(String code);

    @Query(value = "select * from service where service_id=?1 and status= 1 ", nativeQuery = true)
    ServiceEntity findByID(Long id);

    @Query(value = "select * from service where status= 1 ", nativeQuery = true)
    List<ServiceEntity> findAllService();
}

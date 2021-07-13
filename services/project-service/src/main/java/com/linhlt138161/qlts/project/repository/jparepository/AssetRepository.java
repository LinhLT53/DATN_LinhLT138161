package com.linhlt138161.qlts.project.repository.jparepository;

import com.linhlt138161.qlts.project.entity.AssetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<AssetEntity, Long> {
    @Query(value = "select * from asset where asset_code=?1 and STATUS= 1 ", nativeQuery = true)
    AssetEntity findByCode(String code);

    @Query(value = "select * from asset where asset_id=?1 and STATUS= 1 ", nativeQuery = true)
    AssetEntity findByID(Long id);

    @Query(value = "select * from asset where  STATUS= 1 ", nativeQuery = true)
    List<AssetEntity> findAll();

}

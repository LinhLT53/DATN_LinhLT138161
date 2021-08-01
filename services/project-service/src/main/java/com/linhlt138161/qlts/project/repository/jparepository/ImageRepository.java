package com.linhlt138161.qlts.project.repository.jparepository;


import com.linhlt138161.qlts.project.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
    void deleteByIdCodeAndAndTyle(Long idCode,Integer tyle);

    String sql="select i.PATH from image as i where i.TYLE=:tyle and i.ID_CODE=:deviceGroup";
    @Query(value = sql,nativeQuery = true)
    List<String> getListDeviceGruop(Long deviceGroup,Long tyle);
}

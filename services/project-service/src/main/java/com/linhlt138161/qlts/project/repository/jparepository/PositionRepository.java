package com.thao.qlts.project.repository.jparepository;

import com.thao.qlts.project.dto.IPositionDTO;
import com.thao.qlts.project.entity.PositionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PositionRepository extends JpaRepository<PositionEntity,Long> {
    String sql="SELECT ps.ID as id ,ps.CODE as code,ps.NAME as name from POSITION as ps ORDER BY ps.CREATE_DATE DESC";
    @Query(value = sql, nativeQuery = true, countQuery = sql)
    List<IPositionDTO> getPosition();

    String sql1="SELECT ps.ID as id ,ps.CODE as code,ps.NAME as name from POSITION as ps WHERE ps.NAME = :toUpperCase ";
    @Query(value = sql1,nativeQuery = true)
    List<IPositionDTO> getName(String toUpperCase);
}

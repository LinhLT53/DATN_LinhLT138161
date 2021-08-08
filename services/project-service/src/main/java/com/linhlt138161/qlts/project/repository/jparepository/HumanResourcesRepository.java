package com.linhlt138161.qlts.project.repository.jparepository;

import com.linhlt138161.qlts.project.dto.ICusTomDto;
import com.linhlt138161.qlts.project.entity.HumanResourcesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HumanResourcesRepository extends JpaRepository<HumanResourcesEntity, Long> {
    HumanResourcesEntity findByUsername(String username);
    List<HumanResourcesEntity> findByStatus(Integer status);
    //ducvm
    @Query(value = "select * from HUMAN_RESOURCES where CODE=?1 and STATUS=1", nativeQuery = true)
    HumanResourcesEntity findByCode(String code);

    @Query(value = "select * from HUMAN_RESOURCES where  STATUS=1", nativeQuery = true)

    List<HumanResourcesEntity> findByAll();

    @Query(value = "select h from HumanResourcesEntity h where h.humanResourceId = ?1 and h.status = 1")
    List<HumanResourcesEntity> getListHumanResources(Long projectID);

    @Query(value = "select * from HUMAN_RESOURCES where EMAIL=?1 and STATUS=1", nativeQuery = true)
    List<HumanResourcesEntity> findByEmail(String email);
    String sql5="SELECT *  " +
            "FROM human_resources HR  " +
            "WHERE HR.email = :email";
    @Query(value = sql5,nativeQuery = true)
    HumanResourcesEntity findByEmail2(String email);
    /*end duc */
    //TanNV
    HumanResourcesEntity findByHumanResourceId(Long id);
    @Query(value = "select * from HUMAN_RESOURCES where EMAIL=?1 and STATUS !=3", nativeQuery = true)
    List<HumanResourcesEntity> findByEmail1(String email);
    String sql1 = "SELECT p.ID as id ,p.CODE as code,p.NAME as name from PART as p  ";
    String sql9 = "select hr.CODE as code, hr.HUMAN_RESOURCES_ID as id, hr.FULLNAME as name,  " +
            "       (select p.NAME from part as p where p.ID=hr.PART_ID ) as partName  " +
            "from human_resources as hr where  hr.STATUS=1";
    @Query(value = sql9, nativeQuery = true)
    List<ICusTomDto> getcoe();
}

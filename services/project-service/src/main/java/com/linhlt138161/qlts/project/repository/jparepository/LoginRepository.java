package com.thao.qlts.project.repository.jparepository;

import com.thao.qlts.project.entity.LoginEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginRepository extends JpaRepository<LoginEntity,Long> {

    Optional<LoginEntity> findByEmail(String email);
    Optional<LoginEntity> findByHummerId(Long hummerId);

}

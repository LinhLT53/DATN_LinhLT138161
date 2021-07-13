package com.thao.qlts.project.repository.jparepository;

import com.thao.qlts.project.entity.PermissionGroupUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionGroupUserRepository extends JpaRepository<PermissionGroupUserEntity, Long> {
}

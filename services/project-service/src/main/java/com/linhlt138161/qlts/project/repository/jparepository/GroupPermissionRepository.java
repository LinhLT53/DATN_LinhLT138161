package com.thao.qlts.project.repository.jparepository;

import com.thao.qlts.project.entity.GroupPermissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupPermissionRepository extends JpaRepository<GroupPermissionEntity, Long> {
}

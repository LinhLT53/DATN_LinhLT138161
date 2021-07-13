package com.linhlt138161.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "grouppermission_permission")
@AllArgsConstructor
@NoArgsConstructor
public class GroupPermissionPermissionEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "group_permission_id")
    private Long groupPermissionId;
    @Column(name = "permission_id")
    private Long permissionId;

    public GroupPermissionPermissionEntity(Long groupPermissionId, Long permissionId) {
        this.groupPermissionId = groupPermissionId;
        this.permissionId = permissionId;
    }
}

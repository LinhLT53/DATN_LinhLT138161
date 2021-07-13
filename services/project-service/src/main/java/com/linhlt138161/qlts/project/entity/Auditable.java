
package com.thao.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.util.Date;

@Data
@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
public class Auditable<S> {
    @CreatedBy
    @Column(name = "createdBy")
    protected S createdBy;

    @LastModifiedBy
    @Column(name = "modifiedBy")
    protected S modifiedBy;

    @CreatedDate
    @Column(name = "createdDate")
    protected Date createdDate;

    @LastModifiedDate
    @Column(name = "modifiedDate")
    protected Date modifiedDate;
}
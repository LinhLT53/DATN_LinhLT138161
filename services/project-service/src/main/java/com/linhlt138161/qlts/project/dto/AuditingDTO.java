package com.linhlt138161.qlts.project.dto;

import lombok.Data;

import java.util.Date;

@Data
public abstract class AuditingDTO<S> {

    protected S createdBy;

    protected S modifiedBy;

    protected Date createdDate;

    protected Date modifiedDate;
}

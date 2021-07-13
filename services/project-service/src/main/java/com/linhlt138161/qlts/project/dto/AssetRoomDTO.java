package com.linhlt138161.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class AssetRoomDTO extends AuditingDTO<String>{

    private Long assetRoomId;

    private Long assetID;

    private Long roomID;

    private Integer isActive;
}

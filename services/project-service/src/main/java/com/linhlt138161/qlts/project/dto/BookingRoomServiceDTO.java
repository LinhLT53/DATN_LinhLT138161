package com.thao.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRoomServiceDTO extends AuditingDTO<String> {
    private Long bookingroomServiceId;

    private Long bookingId;

    private Long serviceId;

    private Integer quantity;

    private Long total;
    private Long price;
    private String serviceName;
}

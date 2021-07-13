package com.thao.qlts.project.repository.customreporsitory;

import com.thao.qlts.project.dto.RoomTypeDTO;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RoomTypeCustomRepository {
    private final Logger log = LogManager.getLogger(RoomTypeCustomRepository.class);
    @Value("${valueDB}")
    private String valueDb;
    @Autowired
    private EntityManager em;

    public List<RoomTypeDTO> searchAsser(RoomTypeDTO dto) {
        log.info("---------------------sql get kho nhan su------------------");

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT r.room_type_id ,        " +
                "r.code ,        " +
                "r.name,        " +
                "r.hour_price,        " +
                "r.day_price,        " +
                "r.night_price,        " +
                "r.note        " +
                "FROM room_type r         " +
                " where 1 = 1 and r.status = 1 "
        );

        if (StringUtils.isNotBlank(dto.getCode())){
            sql.append("  and (( lower(r.code) LIKE :roomCode ) or ( lower(r.name) LIKE :roomCode ))");
        }
//        if (dto.getRoomType() != null){
//            sql.append(" and r.room_type = :roomType ");
//        }

        Query query = em.createNativeQuery(sql.toString());
        Query queryCount = em.createNativeQuery(sql.toString());
        if (StringUtils.isNotBlank(dto.getCode())){
            query.setParameter("roomCode", "%" + dto.getCode() + "%");
            queryCount.setParameter("roomCode", "%" + dto.getCode() + "%");
        }
//        if (dto.getRoomType() != null){
//            query.setParameter("roomType", dto.getRoomType());
//            queryCount.setParameter("roomType", dto.getRoomType());
//        }

        if (dto.getPage() != null && dto.getPageSize() != null) {
            query.setFirstResult((dto.getPage().intValue() - 1) * dto.getPageSize().intValue());
            query.setMaxResults(dto.getPageSize().intValue());
            dto.setTotalRecord((long) queryCount.getResultList().size());
        }

        List<Object[]> objectList = query.getResultList();
        return converEntytoDTO(objectList);
    }

    private List<RoomTypeDTO> converEntytoDTO(List<Object[]> objects) {
        List<RoomTypeDTO> list = new ArrayList<>();

        if (CollectionUtils.isNotEmpty(objects)) {
            for (Object[] obj : objects) {
                RoomTypeDTO roomTypeDTO = new RoomTypeDTO();
                roomTypeDTO.setRoomTypeId(((BigInteger) obj[0]).longValue());
                roomTypeDTO.setCode(obj[1].toString());
                roomTypeDTO.setName(obj[2].toString());
                roomTypeDTO.setHourPrice(((BigInteger)obj[3]).longValue());
                roomTypeDTO.setDayPrice(((BigInteger)obj[4]).longValue());
                roomTypeDTO.setNightPrice(((BigInteger)obj[5]).longValue());
                roomTypeDTO.setNote(obj[6].toString());
                list.add(roomTypeDTO);
            }
        }
        return list;
    }
}



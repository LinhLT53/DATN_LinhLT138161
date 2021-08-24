package com.linhlt138161.qlts.project.repository.customreporsitory;

import com.linhlt138161.qlts.project.dto.ServiceDutyDTO;
import com.linhlt138161.qlts.project.dto.promotionDTO;
import com.linhlt138161.qlts.project.entity.ServiceDutyEntity;
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
import java.util.Date;
import java.util.List;
@Repository

public class DutyCustomerReponsitory {
    private final Logger log = LogManager.getLogger(promotionCustomRepository.class);
    @Value("${valueDB}")
    private String valueDb;
    @Autowired
    private EntityManager em;

    public List<ServiceDutyDTO> search(ServiceDutyDTO dto) {
        log.info("---------------------sql get khuyen mai------------------");

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT \n" +
                "sd.id,\n" +
                "sd.service_code,"+
                "sd.date,\n" +
                "sd.start_time,\n" +
                "sd.end_time,\n" +
                "sd.actual_start_time,\n" +
                "sd.actual_end_time,\n" +
                "hr.full_name,  " +
                "r.room_name, " +
                "sd.note," +
                "sd.status "+
                "FROM service_duty as sd \n" +
                "left join room  as r on  sd.id_room = r.room_id\n" +
                "left join human_resources as hr on sd.id_staff = hr.human_resource_id\n" +
                " where 1 = 1 and sd.status = 1  "

        );

//        if (StringUtils.isNotBlank(dto.getPromotionCode())){
//            sql.append("  and (( lower(s.promotion_code) LIKE :promotionCode ) or ( lower(s.promotion_name) LIKE :promotionCode ))");
//        }
//        if (dto.getRoomTypeIDSearch() != null){
//            sql.append(" and rt.room_type_id  = :roomType ");
//        }

//        sql.append(" group by pr.promotion_id ");

        Query query = em.createNativeQuery(sql.toString());
        Query queryCount = em.createNativeQuery(sql.toString());
//        if (StringUtils.isNotBlank(dto.getPromotionCode())){
//            query.setParameter("promotionCode", "%" + dto.getPromotionCode() + "%");
//            queryCount.setParameter("promotionCode", "%" + dto.getPromotionCode() + "%");
//        }
//        if (dto.getRoomTypeIDSearch() != null){
//            query.setParameter("roomType", dto.getRoomTypeIDSearch());
//            queryCount.setParameter("roomType", dto.getRoomTypeIDSearch());
//        }

        if (dto.getPage() != null && dto.getPageSize() != null) {
            query.setFirstResult((dto.getPage().intValue() - 1) * dto.getPageSize().intValue());
            query.setMaxResults(dto.getPageSize().intValue());
            dto.setTotalRecord((long) queryCount.getResultList().size());
        }

        List<Object[]> objectList = query.getResultList();
        return converEntytoDTO(objectList);
    }
    public List<ServiceDutyDTO> converEntytoDTO(List<Object[]> objects) {
        List<ServiceDutyDTO> list = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(objects)) {
            for (Object[] obj : objects) {
                ServiceDutyDTO dto = new ServiceDutyDTO();
                dto.setId(((BigInteger) obj[0]).longValue());
                dto.setServicecode((String) obj[1]);
                dto.setDate((Date) obj[2]);
                dto.setStartDateTime((Date) obj[3]);
                dto.setEndDateTime((Date) obj[4]);
                dto.setAcTualStartDateTime((Date) obj[5]);
                dto.setAcTualEndDateTime((Date) obj[6]);
                dto.setFullName((String) obj[7]);
                dto.setRoomName((String) obj[8]);
                dto.setStatus((Integer) obj[10]);
                dto.setNote((String) obj[9]);
                list.add(dto);
            }
        }
        return list;
    }
}


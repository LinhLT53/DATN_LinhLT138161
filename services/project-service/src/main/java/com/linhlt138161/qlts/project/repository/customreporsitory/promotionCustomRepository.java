package com.linhlt138161.qlts.project.repository.customreporsitory;

import com.linhlt138161.qlts.project.dto.promotionDTO;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.type.LongType;
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
public class promotionCustomRepository {
    private final Logger log = LogManager.getLogger(promotionCustomRepository.class);
    @Value("${valueDB}")
    private String valueDb;
    @Autowired
    private EntityManager em;

    public List<promotionDTO> searchPromotion(promotionDTO dto) {
        log.info("---------------------sql get khuyen mai------------------");

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT s.promotion_id,        " +
                " s.promotion_code,        " +
                " s.promotion_name,        " +
                " s.start_Date,  " +
                "  s.end_Date,    " +
                " s.note,        " +
                " s.status,        " +
                " s.percent_Promotion, "+
                " group_concat(name) as roomNameType  "+
                " FROM promotion s        " +
                " left join promotion_roomtype pr on s.promotion_id = pr.promotion_id "+
                " left join room_type rt on pr.roomType_id = rt.room_type_id "+
                " where 1 = 1 and s.status = 1  "

        );

        if (StringUtils.isNotBlank(dto.getPromotionCode())){
            sql.append("  and (( lower(s.promotion_code) LIKE :promotionCode ) or ( lower(s.promotion_name) LIKE :promotionCode ))");
        }
        if (dto.getRoomTypeIDSearch() != null){
            sql.append(" and rt.room_type_id  = :roomType ");
        }

        sql.append(" group by pr.promotion_id ");

        Query query = em.createNativeQuery(sql.toString());
        Query queryCount = em.createNativeQuery(sql.toString());
        if (StringUtils.isNotBlank(dto.getPromotionCode())){
            query.setParameter("promotionCode", "%" + dto.getPromotionCode() + "%");
            queryCount.setParameter("promotionCode", "%" + dto.getPromotionCode() + "%");
        }
        if (dto.getRoomTypeIDSearch() != null){
            query.setParameter("roomType", dto.getRoomTypeIDSearch());
            queryCount.setParameter("roomType", dto.getRoomTypeIDSearch());
        }

        if (dto.getPage() != null && dto.getPageSize() != null) {
            query.setFirstResult((dto.getPage().intValue() - 1) * dto.getPageSize().intValue());
            query.setMaxResults(dto.getPageSize().intValue());
            dto.setTotalRecord((long) queryCount.getResultList().size());
        }

        List<Object[]> objectList = query.getResultList();
        return converEntytoDTO(objectList);
    }

    private List<promotionDTO> converEntytoDTO(List<Object[]> objects) {
        List<promotionDTO> list = new ArrayList<>();

        if (CollectionUtils.isNotEmpty(objects)) {
            for (Object[] obj : objects) {
                promotionDTO dto = new promotionDTO();
                dto.setPromotionId(((BigInteger) obj[0]).longValue());
                dto.setPromotionCode(obj[1].toString());
                dto.setPromotionName(obj[2].toString());
                dto.setStartDate((Date) obj[3]);
                dto.setEndDate((Date) obj[4]);
                dto.setNote(obj[5].toString());
                dto.setStatus((Integer) obj[6]);
                dto.setPercentPromotion((Integer) obj[7]);
                dto.setRoomNameType( obj[8].toString());

                list.add(dto);
            }
        }
        return list;
    }
}

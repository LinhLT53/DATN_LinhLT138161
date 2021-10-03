package com.linhlt138161.qlts.project.repository.customreporsitory;



import com.linhlt138161.qlts.project.dto.AssetDTO;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.collections.CollectionUtils;
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
public class AssetCustomRepository  {
    private final Logger log = LogManager.getLogger(AssetCustomRepository.class);
    @Value("${valueDB}")
    private String valueDb;
    @Autowired
    private EntityManager em;

    public List<AssetDTO> searchAsser(AssetDTO dto){
        log.info("---------------------sql get kho nhan su------------------");

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT a.asset_id ,\n" +
                "                 a.asset_code ,\n" +
                "                       a.asset_name ,\n" +
                "                       a.status ,\n" +
                "                        a.amount,  \n" +
                "                        a.note, \n" +
                "                       a.price,\n" +
                "                       a.Room_id,\n" +
                "                       r.room_name\n" +
                "                FROM asset a \n" +
                "                left join room r on a.Room_id = r.room_id\n" +
                "                where 1 = 1 and a.status = 1"
        );

        if (StringUtils.isNotBlank(dto.getAssetCode())){
            sql.append("  and (( lower(a.asset_code) LIKE :assetCode ) )");
        }
        if (StringUtils.isNotBlank(dto.getAssetname())){
            sql.append(" and ( lower(a.asset_name) LIKE :assetName ) ");
        }
        if (dto.getAmount() != null){
            sql.append(" and a.amount = :amount ");
        }


        Query query = em.createNativeQuery(sql.toString());
        Query queryCount = em.createNativeQuery(sql.toString());

        if (StringUtils.isNotBlank(dto.getAssetCode())){
            query.setParameter("assetCode", "%" + dto.getAssetCode() + "%");
            queryCount.setParameter("assetCode", "%" + dto.getAssetCode() + "%");

        }
        if (StringUtils.isNotBlank(dto.getAssetname())){
            query.setParameter("assetName", "%" +dto.getAssetname()+ "%");
            queryCount.setParameter("assetName", "%" +dto.getAssetname()+ "%");
        }
        if (dto.getAmount() != null){
            query.setParameter("amount", dto.getAmount());
            queryCount.setParameter("amount", dto.getAmount());
        }

        if (dto.getPage() != null && dto.getPageSize() != null) {
            query.setFirstResult((dto.getPage().intValue() - 1) * dto.getPageSize().intValue());
            query.setMaxResults(dto.getPageSize().intValue());
            dto.setTotalRecord((long) queryCount.getResultList().size());
        }

        List<Object[]> objectList = query.getResultList();
        return converEntytoDTO(objectList);
    }
    private List<AssetDTO> converEntytoDTO(List<Object[]> objects){
        List<AssetDTO> list = new ArrayList<>();

        if (CollectionUtils.isNotEmpty(objects)) {
            for (Object[] obj : objects) {
                AssetDTO assetDTO = new AssetDTO();
                assetDTO.setAssetId(((BigInteger) obj[0]).longValue());
                assetDTO.setAssetCode((String) obj[1]);
                assetDTO.setAssetname((String) obj[2]);
                assetDTO.setStatus((Integer) obj[3]);
                assetDTO.setAmount((Integer) obj[4]);
                assetDTO.setNote((String) obj[5]);
                assetDTO.setPrice((Integer) obj[6]);
                assetDTO.setRoomName((String) obj[8]);

                list.add(assetDTO);
            }
        }

        return list;
    }


}

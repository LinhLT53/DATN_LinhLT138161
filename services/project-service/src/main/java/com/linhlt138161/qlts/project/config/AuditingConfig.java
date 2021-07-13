package com.thao.qlts.project.config;

import com.thao.qlts.project.repository.jparepository.HumanResourcesRepository;
import exception.CustomExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class AuditingConfig {
    @Bean
    public AuditorAware auditorProvider() {

        return new AuditorAwareImpl();
    }

    public static class AuditorAwareImpl implements AuditorAware<Long> {
        @Autowired
        private HumanResourcesRepository humanResourcesRepository;

        @Override
        public Optional<Long> getCurrentAuditor() {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (null == authentication || !authentication.isAuthenticated()) {
                throw new CustomExceptionHandler("Unauthorized", HttpStatus.UNAUTHORIZED );
            }
            Object obj = authentication.getPrincipal();
            String email = null;
            Long id = null;
            if (obj instanceof UserDetails) {
                email = ((UserDetails) obj).getUsername();
                try {
//                    id = humanResourcesRepository.findByEmail2(email).getHumanResourceId();

                }catch (Exception e){
                    return Optional.ofNullable(0L);
                }

            } else {
                throw new CustomExceptionHandler("Unauthorized", HttpStatus.UNAUTHORIZED );
            }
            return Optional.ofNullable(id);
        }
    }
}

package de.hft_stuttgart.winf.proj2.sp.backend.dao;

import lombok.*;

@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class CreateModuleDao {

    private String module_id;
    private String course;
    private String definition;

    public CreateModuleDao(){

    }

}

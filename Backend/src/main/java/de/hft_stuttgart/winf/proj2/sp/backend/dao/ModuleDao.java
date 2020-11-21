package de.hft_stuttgart.winf.proj2.sp.backend.dao;

import de.hft_stuttgart.winf.proj2.sp.backend.util.Column;
import lombok.*;

@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class ModuleDao {

    @Column("module_id")
    private Integer module_id;
    @Column("course")
    private String course;
    @Column("definition")
    private String definition;

    public ModuleDao(){

    }

}
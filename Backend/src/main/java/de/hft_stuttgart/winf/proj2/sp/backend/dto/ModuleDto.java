package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import de.hft_stuttgart.winf.proj2.sp.backend.util.Column;
import lombok.*;


/**
 * This Class is for defining the a Module and correlating the correct DB-field to it
 */
@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class ModuleDto {

    @Column("module_id")
    private Integer module_id;
    @Column("definition")
    private String definition;
    @Column(value="course", isObject = true)
    private CourseDTO course;

    public ModuleDto() {

    }

}
package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import de.hft_stuttgart.winf.proj2.sp.backend.util.Column;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

/**
 * This Class is for defining the students to import students via the LSF-Excel file
 */
@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class StudentDTO {

    @Column("matr_nr")
    private Integer matrNumber;
    @Column("course_shortname")
    private String courseShortName;

    public StudentDTO(){
    }

    public StudentDTO(Integer matrNumber){
        this.matrNumber = matrNumber;
    }
}


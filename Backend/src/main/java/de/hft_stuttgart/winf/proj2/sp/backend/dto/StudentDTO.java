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

    @Column("matrNr")
    private Integer matrNr;
    @Column("stg")
    private String stg;

    public StudentDTO(){
    }
}


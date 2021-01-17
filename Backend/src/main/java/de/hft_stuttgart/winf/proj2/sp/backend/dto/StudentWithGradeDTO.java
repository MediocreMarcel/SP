package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class StudentWithGradeDTO extends StudentDTO{

    private float grade;

    public StudentWithGradeDTO(Integer matrNumber, float grade) {
        super(matrNumber);
        this.grade = grade;
    }
}

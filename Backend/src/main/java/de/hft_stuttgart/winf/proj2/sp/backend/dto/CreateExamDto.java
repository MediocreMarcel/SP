package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

/**
 * This Class is for defining a Exam which should be crated
 */
@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class CreateExamDto extends ExamDto {

    @JsonAlias("user_id")
    private int userId;

    public CreateExamDto(){}


}

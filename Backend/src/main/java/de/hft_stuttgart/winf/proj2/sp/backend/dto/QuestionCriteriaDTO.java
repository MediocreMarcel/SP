package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import de.hft_stuttgart.winf.proj2.sp.backend.util.Column;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString(callSuper = true)
@EqualsAndHashCode
public class QuestionCriteriaDTO {

    @Column("criteria_id")
    private Integer criteriaId;
    @Column("criteria_text")
    private String criteria;
    @Column("possible_points")
    private Integer points;

    public QuestionCriteriaDTO() {
    }

}

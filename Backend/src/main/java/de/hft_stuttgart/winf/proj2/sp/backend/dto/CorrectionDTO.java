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
public class CorrectionDTO {

    @Column("question_id")
    private Integer questionId;
    @Column(value="evaluation_criteria", isObject = true)
    private QuestionCriteriaDTO evaluationCriteria;
    @Column("matr_nr")
    private Integer matrNr;
    @Column("comments")
    private String comment;
    @Column("reached_points")
    private Float reachedPoints;
    @Column("status")
    private String status;
    @Column("exam_id")
    private Integer examId;

    public CorrectionDTO(){}
}

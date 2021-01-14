package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@Getter
@ToString(callSuper = true)
@EqualsAndHashCode
public class QuestionWithEvaluationCriteriasDTO extends ExamQuestionDTO {

    @Setter
    private List<QuestionCriteriaDTO> evaluationCriterias;


    public QuestionWithEvaluationCriteriasDTO() {
    }
}

package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class SaveExamAndQuestionsDTO {
    private ExamDto exam;
    private List<ExamQuestionDTO> questions;

    public SaveExamAndQuestionsDTO(){}
}

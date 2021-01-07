package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class SaveExamAndQuestionsDTO {
    private ExamDto exam;
    private QuestionsDto[] questions;

    public SaveExamAndQuestionsDTO(){}
}

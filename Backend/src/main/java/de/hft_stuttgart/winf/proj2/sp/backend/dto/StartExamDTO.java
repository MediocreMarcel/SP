package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class StartExamDTO {

    private ExamDto exam;
    private List<StudentDTO> students;

    public StartExamDTO(){}
}

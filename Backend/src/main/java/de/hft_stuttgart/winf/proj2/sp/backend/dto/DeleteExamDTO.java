package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import lombok.*;

@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class DeleteExamDTO {

    private ExamDto exam;

    private UserDto user;

    public DeleteExamDTO(){}
}

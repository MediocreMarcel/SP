package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString(callSuper = true)
@EqualsAndHashCode
public class RequestCorrectionDTO {

    private Integer questionId;
    private Integer matrNumber;

    public RequestCorrectionDTO(){}
}

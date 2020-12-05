package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;


/**
 * This Class is for defining a Module which should be crated
 */
@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class CreateModuleDto extends ModuleDto {

    @JsonAlias("user_id")
    private int userId;

    public CreateModuleDto(){}

}

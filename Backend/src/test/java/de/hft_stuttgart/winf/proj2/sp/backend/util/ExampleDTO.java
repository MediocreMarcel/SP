package de.hft_stuttgart.winf.proj2.sp.backend.util;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class ExampleDTO {

    @Column("String")
    private String string;
    @Column("Int")
    private Integer integer;
    @Column("Bool")
    private Boolean bool;

    public ExampleDTO(){

    }

}
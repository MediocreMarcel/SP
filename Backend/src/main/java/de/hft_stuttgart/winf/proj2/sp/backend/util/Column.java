package de.hft_stuttgart.winf.proj2.sp.backend.util;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * This Annotation should be set over fields which need to be filled with
 * values from the ResultSetMapper Class. Value should be the name of the DB Attribute
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface Column {

    String value();
}
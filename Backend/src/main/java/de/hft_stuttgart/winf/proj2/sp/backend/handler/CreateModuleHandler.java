package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.dao.CreateModuleDao;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("module")
public class CreateModuleHandler {


        @Path("create")
        @POST
        @Consumes(MediaType.APPLICATION_JSON)
        @Produces(MediaType.APPLICATION_JSON)
        public CreateModuleDao test (CreateModuleDao module){
        System.out.println(module);
        return module;
    }

}

package de.hft_stuttgart.winf.proj2.sp.backend;

import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbConnector;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.jersey.servlet.ServletContainer;

import javax.servlet.DispatcherType;
import java.util.EnumSet;

/**
 * This class sets up the server and the needed environment
 * It also starts the server on Port 8080
 *
 */
public class JettyServer {

    /**
     * Main Method runs on start
     * @param args The starting parameters should be the the following values: ip_of_db user_of_db user_password_of_db
     */
    public static void main(String[] args) {
        Server server = new Server(8080);

        ServletContextHandler ctx =
                new ServletContextHandler(ServletContextHandler.NO_SESSIONS);

        ctx.setContextPath("/");
        server.setHandler(ctx);

        ServletHolder serHol = ctx.addServlet(ServletContainer.class, "/rest/*");
        serHol.setInitOrder(1);
        serHol.setInitParameter(ServerProperties.PROVIDER_PACKAGES,
                "de.hft_stuttgart.winf.proj2.sp.backend.handler");
        serHol.setInitParameter(ServerProperties.PROVIDER_CLASSNAMES, "com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider");



        FilterHolder filterHolder = ctx.addFilter(org.eclipse.jetty.servlets.CrossOriginFilter.class, "/*", EnumSet.of(DispatcherType.REQUEST));
        filterHolder.setInitParameter("allowedOrigins", "http://localhost:4200");

        //Set DB Connection
        DbConnector.setConnectionParameter(args[0], args[1], args[2]);

        try {
            server.start();
            server.join();

        } catch (Exception ex) {
            System.err.println(ex);
            //TODO LOG
        } finally {
            server.destroy();
        }
    }
}

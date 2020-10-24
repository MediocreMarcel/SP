package de.hft_stuttgart.winf.proj2.sp.backend;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.servlet.ServletContainer;

import javax.servlet.DispatcherType;
import java.util.EnumSet;

/**
 * Hello world!
 */
public class JettyServer {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);

        ServletContextHandler ctx =
                new ServletContextHandler(ServletContextHandler.NO_SESSIONS);

        ctx.setContextPath("/");
        server.setHandler(ctx);

        ServletHolder serHol = ctx.addServlet(ServletContainer.class, "/rest/*");
        serHol.setInitOrder(1);
        serHol.setInitParameter("jersey.config.server.provider.packages",
                "de.hft_stuttgart.winf.proj2.sp.backend.handler");

        FilterHolder filterHolder = ctx.addFilter(org.eclipse.jetty.servlets.CrossOriginFilter.class, "/*", EnumSet.of(DispatcherType.REQUEST));
        filterHolder.setInitParameter("allowedOrigins", "http://localhost:4200");

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

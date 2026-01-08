require("dotenv").config();

const fastify = require("fastify")({ logger: true });
const connectDB = require("./db");
const bookingRoutes = require("./routes/booking.routes");

fastify.register(require("@fastify/cors"), {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
});



fastify.register(require("@fastify/swagger"), {
  swagger: {
    info: {
      title: "Booking Dashboard API",
      description: "API documentation for Booking Dashboard",
      version: "1.0.0",
    },
    host: process.env.NODE_ENV === "production"
      ? "booking-dashboard-backend.onrender.com"
      : "localhost:3000",
    schemes: ["https", "http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});


fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
});

async function startServer() {
  await connectDB();

  fastify.register(bookingRoutes, { prefix: "/api" });

  const PORT = process.env.PORT || 3000;
 await fastify.listen({ port: PORT, host: "0.0.0.0" });


  console.log(`Server running on port ${PORT}`);
}

startServer();

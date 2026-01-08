const bookingController = require("../controllers/booking.controller");
const {
  createBookingSchema,
  updateStatusSchema,
  updateBookingSchema,
} = require("../validations/booking.schema");

async function bookingRoutes(fastify) {
  fastify.post(
    "/bookings",
    { schema: createBookingSchema },
    bookingController.createBooking
  );

  fastify.get("/bookings", bookingController.getAllBookings);

  fastify.put(
    "/bookings/:id",
    { schema: updateBookingSchema },
    bookingController.updateBooking
  );

  fastify.put(
    "/bookings/:id/status",
    { schema: updateStatusSchema },
    bookingController.updateBookingStatus
  );

  fastify.delete(
    "/bookings/:id",
    bookingController.deleteBooking
  );
}

module.exports = bookingRoutes;

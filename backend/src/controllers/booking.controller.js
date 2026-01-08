const bookingService = require("../services/booking.service");

class BookingController {
  async createBooking(request, reply) {
    const booking = await bookingService.createBooking(request.body);
    reply.code(201).send({
      success: true,
      data: booking,
    });
  }

  async getAllBookings(request, reply) {
    const bookings = await bookingService.getAllBookings();
    reply.send({
      success: true,
      data: bookings,
    });
  }

  async updateBookingStatus(request, reply) {
    const { id } = request.params;
    const { status } = request.body;

    const booking = await bookingService.updateBookingStatus(id, status);
    reply.send({
      success: true,
      data: booking,
    });
  }

  async updateBooking (request, reply){
  const { id } = request.params;
  const data = request.body;

  const booking = await bookingService.updateBooking(id, data);

  reply.send({
    success: true,
    message: "Booking updated successfully",
    data: booking,
  });
};

async deleteBooking (request, reply){
  const { id } = request.params;

  await bookingService.deleteBooking(id);

  reply.send({
    success: true,
    message: "Booking deleted successfully",
  });
};
}

module.exports = new BookingController();

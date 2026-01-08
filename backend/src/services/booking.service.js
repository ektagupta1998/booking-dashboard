const bookingRepository = require("../repositories/booking.repository");

class BookingService {
  async createBooking(data) {
    return bookingRepository.create(data);
  }

  async getAllBookings() {
    return bookingRepository.findAll();
  }

  async updateBooking(id, data) {
    const booking = await bookingRepository.findByIdAndUpdate(id, data);

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    return booking;
  }

  async updateBookingStatus(id, status) {
    const booking = await bookingRepository.findByIdAndUpdate(id, { status });

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    return booking;
  }

  async deleteBooking(id) {
    const booking = await bookingRepository.findByIdAndDelete(id);

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    return booking;
  }
}

module.exports = new BookingService();

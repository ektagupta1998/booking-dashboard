const Booking = require("../models/booking.model");

class BookingRepository {
  create(data) {
    return Booking.create(data);
  }

  findAll() {
    return Booking.find().sort({ createdAt: -1 });
  }

  findByIdAndUpdate(id, updateData) {
    return Booking.findByIdAndUpdate(id, updateData, { new: true });
  }

  findByIdAndDelete(id) {
    return Booking.findByIdAndDelete(id);
  }
}

module.exports = new BookingRepository();

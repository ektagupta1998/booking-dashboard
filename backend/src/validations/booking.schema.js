const createBookingSchema = {
  body: {
    type: "object",
    required: ["customerName", "serviceName", "bookingDate"],
    properties: {
      customerName: { type: "string" },
      serviceName: { type: "string" },
      bookingDate: { type: "string", format: "date" },
    },
  },
};

const updateStatusSchema = {
  body: {
    type: "object",
    required: ["status"],
    properties: {
      status: {
        type: "string",
        enum: ["pending", "confirmed", "cancelled"],
      },
    },
  },
};
const updateBookingSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  body: {
    type: "object",
    additionalProperties: false,
    properties: {
      customerName: { type: "string", minLength: 1 },
      serviceName: { type: "string", minLength: 1 },
      bookingDate: {
        type: "string",
        pattern: "^\\d{4}-\\d{2}-\\d{2}$", 
      },
    },
  },
};



module.exports = {
  createBookingSchema,
  updateStatusSchema,
  updateBookingSchema
};

import { getTodayDate } from "./date.helper";

export const validateBookingForm = (form) => {
  const errors = {};

  if (!form.customerName?.trim()) {
    errors.customerName = "Customer name is required";
  } else if (form.customerName.length < 3) {
    errors.customerName = "Minimum 3 characters required";
  }

  if (!form.serviceName?.trim()) {
    errors.serviceName = "Service name is required";
  } else if (form.serviceName.length < 3) {
    errors.serviceName = "Minimum 3 characters required";
  }

  if (!form.bookingDate) {
    errors.bookingDate = "Booking date is required";
  } else if (form.bookingDate < getTodayDate()) {
    errors.bookingDate = "Booking date must be today or future";
  }

  return errors;
};

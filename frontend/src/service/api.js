const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const api = {
  getBookings: async () => {
    const res = await fetch(`${BASE_URL}/bookings`);

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    return res.json();
  },

  createBooking: async (data) => {
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create booking");
    }

    return res.json();
  },

  updateBooking: async (id, data) => {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to update booking");
    }

    return res.json();
  },

  updateStatus: async (id, status) => {
    const res = await fetch(`${BASE_URL}/bookings/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      throw new Error("Failed to update status");
    }

    return res.json();
  },

  deleteBooking: async (id) => {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete booking");
    }

    return res.json();
  },
};

import { useEffect, useState } from "react";
import { api } from "../service/api";
import { getTodayDate } from "../helpers/date.helper";
import { validateBookingForm } from "../helpers/booking.validation";
import { toast } from "react-toastify";


export default function CreateBookingModal({
  onClose,
  onSuccess,
  initialData,
}) {
  const [form, setForm] = useState({
    customerName: "",
    serviceName: "",
    bookingDate: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        customerName: initialData.customerName || "",
        serviceName: initialData.serviceName || "",
        bookingDate: initialData.bookingDate
          ? initialData.bookingDate.split("T")[0]
          : "",
      });
    }
  }, [initialData]);

  const submit = async () => {
    const validationErrors = validateBookingForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      if (initialData) {
        await api.updateBooking(initialData._id, form);
        toast.success("Booking updated successfully");
      } else {
        await api.createBooking(form);
        toast.success("Booking created successfully");
      }

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="flex-1 bg-black bg-opacity-40"
        onClick={onClose}
      />

      <div className="w-full sm:w-[400px] bg-white p-6 shadow-lg animate-slideIn">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Booking" : "Add Booking"}
        </h2>

        <input
          className="border p-2 w-full rounded"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={(e) =>
            setForm({ ...form, customerName: e.target.value })
          }
        />
        {errors.customerName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.customerName}
          </p>
        )}

        <input
          className="border p-2 w-full mt-3 rounded"
          placeholder="Service Name"
          value={form.serviceName}
          onChange={(e) =>
            setForm({ ...form, serviceName: e.target.value })
          }
        />
        {errors.serviceName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.serviceName}
          </p>
        )}

        <input
          type="date"
          min={getTodayDate()}
          className="border p-2 w-full mt-3 rounded"
          value={form.bookingDate}
          onChange={(e) =>
            setForm({ ...form, bookingDate: e.target.value })
          }
        />
        {errors.bookingDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.bookingDate}
          </p>
        )}

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? "Saving..."
              : initialData
              ? "Update"
              : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

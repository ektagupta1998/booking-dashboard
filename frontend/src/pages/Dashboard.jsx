import { useEffect, useState } from "react";
import { api } from "../service/api";
import CreateBookingModal from "../components/CreateBookingModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import moment from "moment";
import { toast } from "react-toastify";




export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editBooking, setEditBooking] = useState(null);
  const [deleteBookingId, setDeleteBookingId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);



  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.getBookings();
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  const refreshBookings = async () => {
    const res = await api.getBookings();
    setBookings(res.data);
  };

  const count = (status) => bookings.filter((b) => b.status === status).length;

  const handleDeleteBooking = async () => {
  try {
    setDeleteLoading(true);
    await api.deleteBooking(deleteBookingId);
    toast.success("Booking deleted successfully");
    setDeleteBookingId(null);
    refreshBookings();
  } catch (err) {
    toast.error(err);
  } finally {
    setDeleteLoading(false);
  }
};


  return (
    <div className="bg-gray-100 min-h-full p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Booking Dashboard
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow w-full sm:w-auto"
        >
          + Add Booking
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total" value={bookings.length} color="bg-indigo-500" />
        <StatCard title="Pending" value={count("pending")} color="bg-yellow-500" />
        <StatCard title="Confirmed" value={count("confirmed")} color="bg-green-500" />
        <StatCard title="Cancelled" value={count("cancelled")} color="bg-red-500" />
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-[600px] w-full text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Service</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
               <tr key={b._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{b.customerName}</td>
                  <td className="p-3">{b.serviceName}</td>
                  <td className="p-3 whitespace-nowrap">
                    {moment(b.bookingDate).format("DD MMM YYYY")}
                  </td>

                  <td className="p-3">
                    <select
                      value={b.status}
                      onChange={async (e) => {
                      try {
                        await api.updateStatus(b._id, e.target.value);
                        toast.success("Status updated successfully");
                        refreshBookings();
                      } catch (err) {
                        console.error(err);
                        toast.error("Failed to update status");
                      }
                    }}

                      className={`px-3 py-1 rounded text-sm font-medium border
                        ${
                          b.status === "pending"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                            : b.status === "confirmed"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : "bg-red-100 text-red-700 border-red-300"
                        }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-3">
                      <button
                        title="Edit"
                        onClick={() => {
                          setEditBooking(b);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:bg-blue-100 p-1 rounded"
                      >
                       <FaEdit size={16} />
                      </button>

                      <button
                          title="Delete"
                          onClick={() => setDeleteBookingId(b._id)}
                          className="text-red-600 hover:bg-red-100 p-1 rounded"
                        >
                          <FaTrash size={16} />
                        </button>

                    </div>
                  </td>
               </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <CreateBookingModal
          onClose={() => {
            setShowModal(false);
            setEditBooking(null);
          }}
          onSuccess={refreshBookings}
          initialData={editBooking}
        />
      )}

      {deleteBookingId && (
        <ConfirmDeleteModal
          title="Delete Booking"
          message="Are you sure you want to delete this booking? This action cannot be undone."
          onCancel={() => setDeleteBookingId(null)}
          onConfirm={handleDeleteBooking}
          loading={deleteLoading}
        />
      )}

    </div>
  );
}



const StatCard = ({ title, value, color }) => (
  <div className={`text-white p-4 rounded shadow ${color}`}>
    <p className="text-sm">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

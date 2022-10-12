import { updateReservationStatus } from "../utils/api";
import ReservationItem from "./ReservationItem";

export default function ReservationList({ reservations, setReservations, loadDashboard }) {
  const handleSeat = async (reservation_id) => {
    await updateReservationStatus(reservation_id, "seated");
  };

  const handleCancel = async (reservation_id) => {
    let confirmed = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone"
    );
    if (confirmed) {
      await updateReservationStatus(reservation_id, "cancelled");
      await loadDashboard();
    }
  };

  return reservations.length === 0 ? (
    <div className="opacity-layer">No reservations for today yet...</div>
  ) : (
    reservations.map((reservation) => (
      <ReservationItem
        key={reservation.reservation_id}
        handleCancel={handleCancel}
        handleSeat={handleSeat}
        reservation={reservation}
      />
    ))
  );
}

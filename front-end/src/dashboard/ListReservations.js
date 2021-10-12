import React, { useState } from "react";

export default function ListReservations() {
  const [reservations, setReservations] = useState([]);
  const listOfReservations = reservations.map((reservation, index) => {
    return (
      <tr id={reservation.reservation_id} key={index}>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td>{reservation.status}</td>
        <td>{reservation.seat_table}</td>
      </tr>
    );
  });

  return <table>{listOfReservations}</table>;
}

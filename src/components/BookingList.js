// BookingList.js
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // Import Supabase client

const BookingList = ({ selectedDate, deleteBooking }) => {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from Supabase when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('date', selectedDate); // Filter by the selected date

      if (error) {
        console.error('Error fetching bookings:', error);
      } else {
        setBookings(data);
      }
    };

    fetchBookings();
  }, [selectedDate]); // Re-fetch bookings whenever selectedDate changes

  const handleDelete = async (id) => {
    // Delete the booking from Supabase
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting booking:', error);
    } else {
      deleteBooking(id); // Update local state after deletion
    }
  };

  return (
    <div className="booking-list">
      <h3>Bookings for {selectedDate}</h3>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-card">
              <div className="booking-details">
                <span className="car">Car: {booking.car}</span>
                <span className="time">Time: {booking.time}</span>
                <span className="reason">Reason: {booking.reason}</span>
                <span className="person">Person: {booking.person}</span>
              </div>
              <button
                className="booking-delete"
                onClick={() => handleDelete(booking.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings for this day.</p>
      )}
    </div>
  );
};

export default BookingList;
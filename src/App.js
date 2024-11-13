// App.js
import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import './App.css';
import supabase from './components/supabase';  // Import your Supabase client

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Function to fetch bookings from Supabase
  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*');
      
    if (error) {
      console.error('Error fetching bookings:', error);
    } else {
      setBookings(data); // Update the state with the fetched bookings
    }
  };

  useEffect(() => {
    fetchBookings();  // Fetch bookings when the component loads
  }, []);

  // Add a new booking to Supabase
  const addBooking = async (newBooking) => {
    await supabase
      .from('bookings')
      .insert([{ ...newBooking }]);

      window.location.reload();
  };

  // Delete a booking from Supabase
  const deleteBooking = async (id) => {
    await supabase
      .from('bookings')
      .delete()
      .match({ id });

      window.location.reload();
  };

  return (
    <div className="App">
      <h1>Car Booking Calendar</h1>
      
      <div className="calendar-container">
        <Calendar setSelectedDate={setSelectedDate} />
      </div>

      <div className="booking-form-container">
        {selectedDate && (
          <BookingForm
            selectedDate={selectedDate}
            addBooking={addBooking}
          />
        )}
      </div>

      <BookingList
        bookings={bookings}
        selectedDate={selectedDate}
        deleteBooking={deleteBooking}
      />
    </div>
  );
}

export default App;

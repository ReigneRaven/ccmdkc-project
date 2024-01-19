import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

const UpcomingPtn = () => {
  const [appointments, setAppointments] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    axios.get(`http://localhost:5000/api/user/${userId}`)
      .then(response => setLoggedInUser(response.data))
      .catch(error => console.error('Error fetching user:', error));

    axios.get(`http://localhost:5000/api/appointments/user/${userId}`)
      .then(response => {
        const formattedAppointments = response.data.map(appointment => ({
          ...appointment,
          appointmentDate: new Date(appointment.appointmentDate).toLocaleDateString('en-US'),
        }));
        setAppointments(formattedAppointments);
      })
      .catch(error => console.error('Error fetching appointments:', error));

    const handleAppointmentStatusChange = (data) => {
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment._id === data.appointmentId
            ? { ...appointment, status: data.status }
            : appointment
        )
      );
    };

    socket.on('appointmentStatusChanged', handleAppointmentStatusChange);

    return () => {
      socket.off('appointmentStatusChanged', handleAppointmentStatusChange);
      socket.disconnect();
    };
  }, []); 

  const filteredAppointments = appointments.filter(appointment =>
    appointment.name === loggedInUser?.name
  );

  return (
    <div className="upcoming-wrapper">
      <p>Upcoming Appointments</p>

      <div className="table-appointment">
        <table className="table-ptn">
          <thead>
            <tr>
              <th>Username</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appointment => (
              
              <tr
                key={appointment._id}
                className={appointment.status === 'Accepted' ? 'accepted'
                 : appointment.status === 'Denied' ? 'denied' : ''}
              >
                <td>{appointment.UserName}</td>
                <td>{appointment.service}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingPtn;

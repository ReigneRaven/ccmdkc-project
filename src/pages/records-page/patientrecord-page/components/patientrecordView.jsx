import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PatientRecordView() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/records")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient record data:", error);
      });
  }, []);

  return (
    <div className="patientrecord-table-content">
      <div className="table-container"> {/* Added a container div */}
        <table className="table">
          <thead id="header-patientrecord">
            <tr>
              <th>Patient Name</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Age</th>
              <th>Sex</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <tr key={record._id}>
                <td>{record.patientName}</td>
                <td>{record.weight}</td>
                <td>{record.height}</td>
                <td>{record.age}</td>
                <td>{record.sex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

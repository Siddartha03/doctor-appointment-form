import React, { useState } from "react";
import "./BookAppointment.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";

function BookAppointment(props) {
  const doctorData = [
    { label: "Cardiologists", id: 45346070 },
    { label: "Dermatologists", id: 45346071 },
    { label: "Emergency Medicine Specialist", id: 45346072 },
    { label: "Gastroenterologists", id: 45346073 },
    { label: "Hematologists", id: 45346074 },
  ];

  const channelData = [
    { label: "Walk In" },
    { label: "By App" },
    { label: "By Phone call" },
    { label: "By Email" },
  ];

  const apTypeData = [
    { label: "Walk In" },
    { label: "By App" },
    { label: "By Phone call" },
    { label: "By Email" },
  ];

  const [doctorId, setDoctorId] = useState(null);
  const [channel, setChannel] = useState(null);
  const [apType, setApType] = useState(null);
  const [apTitle, setApTitle] = useState("");
  const [toDate, setToDate] = useState(moment());
  const [toTime, setToTime] = useState(moment());

  const selectDoctor = (value) => {
    if (value) {
      const doctor = doctorData.find((data) => data.label === value);
      doctor ? setDoctorId(doctor) : setDoctorId(null);
    } else {
      setDoctorId(null);
    }
  };
  const handleDateChange = (newValue) => {
    console.log(newValue);
    setToDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container">
        <div className="inner-container">
          <div className="left-container">
            <h4 className="header">Details</h4>
            <div className="autocomplete">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={doctorData}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Doctor" />
                )}
                onInputChange={(e, value) => selectDoctor(value)}
              />
            </div>
            <div className="autocomplete">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={channelData}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Appointment Channel" />
                )}
                onInputChange={(e, value) => setChannel(value)}
              />
            </div>
            <div className="autocomplete title">
              <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Appointment Title"
                variant="outlined"
                onChange={(e) => setApTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="right-container">
            <div>
              <h4 className="header">Details</h4>
              {doctorId && (
                <div className="d-flex pid">
                  <p className="text">{doctorId?.label}</p>
                  <p className="text">PID: {doctorId?.id}</p>
                </div>
              )}
              {channel && (
                <div className="mb-10">
                  <p className="text">{channel} Appointment</p>
                </div>
              )}
              <div className="date-time">
                <div>
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={toDate}
                    minDate={moment()}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="time-picker">
                  <TimePicker
                    label="Time"
                    value={toTime}
                    onChange={(e) => setToTime(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </div>
              <div className="autocomplete">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={apTypeData}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Appointment Type" />
                  )}
                  onSelect={(e) => setApType(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default BookAppointment;

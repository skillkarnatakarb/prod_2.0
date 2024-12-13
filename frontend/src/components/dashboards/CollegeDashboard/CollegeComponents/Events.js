import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Events = ({ onAddEvent }) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast.error("Please fill in all required fields!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    onAddEvent(newEvent); // Pass the event to the parent
    setNewEvent({ title: "", date: "", description: "" }); // Reset the form
    setOpen(false); // Close the modal

    toast.success("Event added successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <div>
      {/* Inline CSS for Toastify */}
      <style>
        {`
          .Toastify__toast--success, .Toastify__toast--error {
            border-radius: 8px;
            font-weight: bold;
            height: auto;
            padding: 10px 15px;
            color: white !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
          }
          .Toastify__toast--success {
            background-color: #4caf50 !important;
          }
          .Toastify__toast--error {
            background-color: #f44336 !important;
          }
          .Toastify__toast-body {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 100%;
            word-break: break-word;
          }
        `}
      </style>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Add Event
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            name="title"
            label="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="date"
            label="Event Date"
            type="date"
            value={newEvent.date}
            onChange={handleInputChange}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="description"
            label="Event Description"
            value={newEvent.description}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} color="primary" variant="contained">
            Save Event
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Events;

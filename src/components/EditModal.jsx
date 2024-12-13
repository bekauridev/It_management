import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/joy";

const EditModal = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, name: value }));
  };

  const handleSave = () => {
    onSave(formData); // Pass updated data back to parent
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          p: 3,
          borderRadius: 1,
          backgroundColor: "background.paper",
          maxWidth: 500,
          margin: "auto",
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        {/* Add other fields as necessary */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="plain" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="soft" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;

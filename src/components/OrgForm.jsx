import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Option,
  Textarea,
  Typography,
} from "@mui/joy";
import { fetchRequest } from "../utils/fetchRequest";
import AlertMessage from "./AlertMessage";

const OrgForm = () => {
  const [formData, setFormData] = useState({
    category: "employee",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const noteLength = formData.notes.length || 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Sanitize the phone number
    const sanitizedPhone = formData.phone.replace(/[^0-9]/g, ""); // Remove all non-numeric characters

    const sanitizedData = {
      ...formData,
      phone: sanitizedPhone, // Replace phone with sanitized version
    };

    const url = formData.category === "customer" ? "customers" : "employees";

    try {
      const res = await fetchRequest(url, "POST", sanitizedData);

      // Clear the form
      setFormData({
        name: "",
        phone: "",
        email: "",
        notes: "",
        category: "employee",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        name="category"
        value={formData.category}
        onChange={(e, value) =>
          handleChange({ target: { name: "category", value } })
        }
        sx={{ mb: 2 }}
      >
        <Option value="customer">Customer</Option>
        <Option value="employee">Employee</Option>
      </Select>

      <Box mb={2}>
        <Input
          type="text"
          name="name"
          placeholder={`${formData.category} name`}
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
      </Box>

      <Box mb={2}>
        <Input
          type="text"
          name="phone"
          placeholder={`${formData.category} phone number`}
          value={formData.phone}
          onChange={handleChange}
        />
      </Box>

      <Box mb={2}>
        <Input
          type="text"
          name="email"
          placeholder={`${formData.category} email address`}
          value={formData.email}
          onChange={handleChange}
        />
      </Box>

      <Box mb={2}>
        <Textarea
          name="notes"
          minRows={4}
          placeholder={`What you think about ${formData.category}`}
          value={formData.notes}
          onChange={handleChange}
          endDecorator={
            <Typography level="body-xs" sx={{ ml: "auto" }}>
              {noteLength} character(s)
            </Typography>
          }
        />
      </Box>

      <Button type="submit" loading={loading}>
        Save
      </Button>

      {error && <AlertMessage color="danger" message={error} />}
    </form>
  );
};

export default OrgForm;

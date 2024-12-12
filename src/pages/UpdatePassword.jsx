// src/pages/UpdatePassword.js
import { useState } from "react";
import { useParams } from "react-router-dom";
// import { API } from "../api/axios";

function UpdatePassword() {
  return <div>UpdatePassword</div>;
  // const { id } = useParams(); // User ID from route params
  // const [formData, setFormData] = useState({
  //   currentPassword: "",
  //   password: "",
  //   passwordConfirm: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleUpdatePassword = async () => {
  //   try {
  //     await API.patch(`/updatePassword/${id}`, formData);
  //     alert("Password updated successfully.");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to update password.");
  //   }
  // };

  // return (
  //   <VStack spacing={4} align="center">
  //     <Heading>Update Password</Heading>
  //     <Input
  //       placeholder="Current Password"
  //       type="password"
  //       name="currentPassword"
  //       value={formData.currentPassword}
  //       onChange={handleChange}
  //     />
  //     <Input
  //       placeholder="New Password"
  //       type="password"
  //       name="password"
  //       value={formData.password}
  //       onChange={handleChange}
  //     />
  //     <Input
  //       placeholder="Confirm New Password"
  //       type="password"
  //       name="passwordConfirm"
  //       value={formData.passwordConfirm}
  //       onChange={handleChange}
  //     />
  //     <Button onClick={handleUpdatePassword}>Update Password</Button>
  //   </VStack>
  // );
}

export default UpdatePassword;

import toast from "react-hot-toast/headless";

const showToast = (message, type) => {
  const duration = type === "success" ? 3000 : 5000;
  toast(message, { type, duration });
};

export { showToast };

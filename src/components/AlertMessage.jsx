import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Snackbar, Alert } from "@mui/joy";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

function AlertMessage({ message, color = "danger", duration = 5500 }) {
  const [open, setOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);
  const timerRef = useRef(null);

  // State to handle multiple messages
  const [messages, setMessages] = useState([]);

  // Add a new message to the queue whenever `message` changes
  useEffect(() => {
    if (message) {
      setMessages((prev) => [...prev, { text: message, id: Date.now() }]);
    }
  }, [message]);

  // Responsive screen size detection
  useEffect(() => {
    const resizeListener = () => setIsSmallScreen(window.innerWidth <= 600);
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  // Auto-hide timer logic for the first message in the queue
  useEffect(() => {
    if (open && messages.length > 0 && duration > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = Math.max(0, prev - 100);
          if (newTime === 0) {
            handleClose(messages[0].id);
          }
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [open, duration, messages]);

  const handleClose = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    clearInterval(timerRef.current);
    setOpen(false);
    setTimeLeft(duration); // Reset the timer for the next message
  };

  const handlePause = () => clearInterval(timerRef.current);

  const handleResume = () => {
    if (timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 100));
      }, 100);
    }
  };

  const iconMap = {
    success: <FaCheckCircle size={isSmallScreen ? 20 : 24} color="green" />,
    warning: (
      <FaExclamationTriangle size={isSmallScreen ? 20 : 24} color="orange" />
    ),
    danger: (
      <MdErrorOutline size={isSmallScreen ? 22 : 28} color="rgb(226, 47, 47)" />
    ),
  };

  const getIcon = () => iconMap[color] || iconMap.danger;

  return (
    <>
      {messages.map((msg) => (
        <Snackbar
          key={msg.id}
          open={open}
          autoHideDuration={duration}
          onClose={() => handleClose(msg.id)}
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            px: "1rem",
            py: "0px",
            maxWidth: isSmallScreen ? "90%" : "400px",
            margin: "auto",
          }}
        >
          {getIcon()}
          <Alert
            onClose={() => handleClose(msg.id)}
            color={color}
            variant="plain"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              width: isSmallScreen ? "80%" : "100%",
              fontSize: isSmallScreen ? "0.875rem" : "1rem",
            }}
          >
            {msg.text}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}

// PropTypes validation
AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["success", "danger", "warning"]),
  duration: PropTypes.number,
};

export default AlertMessage;

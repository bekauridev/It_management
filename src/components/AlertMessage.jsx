import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Snackbar, Alert } from "@mui/joy";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

/**
 * A responsive and user-friendly alert message component with icons.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.message - The message to display to the user.
 * @param {"success"|"danger"|"warning"} [props.color="danger"] - The alert's color type, which adjusts styling and icon context.
 * @param {number} [props.duration=5500] - Duration (in milliseconds) for which the alert is displayed before auto-hiding.
 *
 * @example
 * // Display a success message
 * <AlertMessage message="Operation successful!" color="success" />
 *
 * @example
 * // Display a warning message for a custom duration
 * <AlertMessage message="This is a warning!" color="warning" duration={3000} />
 */
function AlertMessage({ message, color = "danger", duration = 5500 }) {
  const [open, setOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const timerRef = useRef(null);

  // Screen size check
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 600);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Countdown for auto-hide
  useEffect(() => {
    if (open && duration > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 100));
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [open, duration]);

  const handlePause = () => clearInterval(timerRef.current);
  const handleResume = () => {
    if (timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 100));
      }, 100);
    }
  };

  const handleClose = () => {
    setOpen(false);
    clearInterval(timerRef.current);
  };

  // Swipe detection
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart && touchEnd && Math.abs(touchStart - touchEnd) > 50) {
      handleClose();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Select icon based on the color prop
  const getIcon = () => {
    switch (color) {
      case "success":
        return <FaCheckCircle size={isSmallScreen ? 20 : 24} color="green" />;
      case "warning":
        return (
          <FaExclamationTriangle
            size={isSmallScreen ? 20 : 24}
            color="orange"
          />
        );
      case "danger":
      default:
        return (
          <FaExclamationCircle size={isSmallScreen ? 20 : 24} color="red" />
        );
    }
  };

  return (
    <Snackbar
      open={open}
      size={isSmallScreen ? "sm" : "lg"}
      autoHideDuration={duration}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{ px: "1rem 1.5rem", py: "0px" }}
    >
      {getIcon()}
      <Alert
        onClose={handleClose}
        color={color}
        variant="plain"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          width: isSmallScreen ? "80%" : "100%",
          backgroundColor: "background.surface",
          fontSize: isSmallScreen ? "0.875rem" : "1rem",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

// PropTypes validation
AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["success", "danger", "warning"]),
  duration: PropTypes.number,
};

export default AlertMessage;

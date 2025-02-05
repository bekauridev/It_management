import React from "react";
import { useToaster } from "react-hot-toast/headless";
import { Alert } from "@mui/joy";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

const CustomToaster = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;

  const getToastStyle = (color) => {
    switch (color) {
      case "success":
        return {
          icon: <FaCheckCircle color="green" size={20} />,
          color: "success",
        };
      case "warning":
        return {
          icon: <FaExclamationTriangle color="orange" size={20} />,
          color: "warning",
        };
      case "danger":
        return {
          icon: <MdErrorOutline color="rgb(226, 47, 47)" size={20} />,
          color: "danger",
        };
      default:
        return {
          color: "primary",
        };
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        left: 5,
        zIndex: 8888,
      }}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        const offset = calculateOffset(toast, {
          reverseOrder: false,
          margin: 8,
        });
        const ref = (el) => {
          if (el && typeof toast.height !== "number") {
            updateHeight(toast.id, el.getBoundingClientRect().height);
          }
        };

        const { icon, color } = getToastStyle(toast.type || "danger");

        return (
          <div
            key={toast.id}
            ref={ref}
            style={{
              position: "absolute",
              width: "300px",
              transition: "all 0.5s ease-out",
              opacity: toast.visible ? 1 : 0,
              transform: `translateY(${offset}px)`,
            }}
          >
            <Alert
              color={color}
              variant="soft"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "0.875rem",
                boxShadow: 2,
                borderRadius: "8px",
                padding: "12px 16px",
              }}
            >
              {icon}
              {toast.message}
            </Alert>
          </div>
        );
      })}
    </div>
  );
};

export default CustomToaster;

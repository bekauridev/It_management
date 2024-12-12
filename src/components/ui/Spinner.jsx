import { Box, CircularProgress } from "@mui/joy";
import PropTypes from "prop-types";

/**
 * Spinner is a component that renders a circular progress indicator.
 *
 * @param {object} props - The properties passed to the Spinner component.
 * @prop {string} size - The size of the Spinner. Valid values are "sm", "md", "lg", "xl".
 * @prop {number} thickness - The thickness of the Spinner's stroke.
 * @prop {number} value - Determines the fullness of the Spinner. Only applicable for determinate variant.
 * @prop {string} variant - The variant of the Spinner. Valid values are "plain", "soft", "outlined", "solid".
 * @prop {string} color - The color of the Spinner. Defaults to "primary".
//  * @prop {object} styles - Additional styles to apply to the Spinner container.
 * @returns {React.ReactElement}
 */
function Spinner({
  size = "sm",
  thickness = 3,
  value = 30,
  variant = "plain",
  color = "primary",
  // styles = {},
}) {
  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100%",
    //     ...styles, // Allow custom styles to override defaults
    //   }}
    // >
    <CircularProgress
      size={size}
      thickness={thickness}
      value={value}
      variant={variant}
      color={color}
    />
    // </Box>
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  thickness: PropTypes.number,
  value: PropTypes.number,
  variant: PropTypes.oneOf(["plain", "soft", "outlined", "solid"]),
  color: PropTypes.string,
  // styles: PropTypes.object,
};

export default Spinner;

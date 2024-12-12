import { Button, Modal, ModalClose, Sheet, Typography } from "@mui/joy";

/**
 * Modal component for displaying a confirmation dialog.
 *
 * @param {Function} callBack - The function to call when the primary action button is clicked.
 * @param {boolean} open - A boolean indicating whether the modal is open.
 * @param {Function} setOpen - A function to update the open state of the modal.
 * @param {string} title - The title of the modal dialog.
 * @param {string} description - The description text displayed within the modal.
 * @param {string} primaryActionText - The text for the primary action button.
 * @param {string} closeActionText - The text for the close button.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
function ModalWindow({
  callBack,
  open,
  setOpen,
  title,
  description,
  primaryActionText,
  closeActionText,
}) {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)} // Close modal when background or close button is clicked
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
      >
        <ModalClose
          variant="plain"
          sx={{ m: 1 }}
          onClick={() => setOpen(false)}
        />{" "}
        {/* Ensure close works */}
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: "lg", mb: 1 }}
        >
          {title}
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Button
          variant="solid"
          color="primary"
          onClick={callBack} // Trigger the provided callback (for primary action)
          sx={{ mr: 1 }}
        >
          {primaryActionText}
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(false)} // Close modal when this button is clicked
        >
          {closeActionText}
        </Button>
      </Sheet>
    </Modal>
  );
}

export default ModalWindow;

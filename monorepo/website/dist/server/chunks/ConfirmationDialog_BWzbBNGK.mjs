import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';
import { confirmAlert } from 'react-confirm-alert';

const ConfirmationDialog = ({
  dialogText,
  onConfirmation,
  onClose,
  confirmButtonText = "Confirm",
  closeButtonText = "Cancel"
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "modal-box", children: [
    /* @__PURE__ */ jsx("form", { method: "dialog", children: /* @__PURE__ */ jsx("button", { className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2", onClick: onClose, children: "✕" }) }),
    /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: dialogText }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-4 mt-4", children: [
      /* @__PURE__ */ jsx("form", { method: "dialog", children: /* @__PURE__ */ jsx("button", { className: "btn loculusColor text-white hover:bg-primary-700", onClick: onClose, children: closeButtonText }) }),
      /* @__PURE__ */ jsx("form", { method: "dialog", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn loculusColor text-white hover:bg-primary-700",
          onClick: () => void onConfirmation(),
          children: confirmButtonText
        }
      ) })
    ] })
  ] });
};
const displayConfirmationDialog = ({
  dialogText,
  onConfirmation,
  confirmButtonText = "Confirm",
  closeButtonText = "Cancel"
}) => {
  confirmAlert({
    closeOnClickOutside: true,
    customUI: ({ onClose }) => /* @__PURE__ */ jsx(
      ConfirmationDialog,
      {
        dialogText,
        confirmButtonText,
        closeButtonText,
        onConfirmation: async () => {
          await onConfirmation();
          onClose();
        },
        onClose
      }
    )
  });
};

export { displayConfirmationDialog as d };

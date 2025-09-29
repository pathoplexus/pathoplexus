import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Datepicker } from 'flowbite-react';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { g as getClientLogger } from './clientLogger_iKuJ-UyB.mjs';
import { a5 as openDataUseTermsOption, U as restrictedDataUseTermsOption } from './config_CQtV1zSN.mjs';
import { F as ForwardRef, a as ForwardRef$1 } from './unlocked_6dRdJrtu.mjs';

const logger$1 = getClientLogger("DateChangeModal");
const datePickerTheme = {
  root: {
    base: "relative"
  },
  popup: {
    root: {
      base: "absolute top-10 z-50 block pt-2",
      inline: "relative top-0 z-auto",
      inner: "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700"
    },
    header: {
      base: "",
      title: "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
      selectors: {
        base: "flex justify-between mb-2",
        button: {
          base: "text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200",
          prev: "",
          next: "",
          view: "cursor-default pointer-events-none"
        }
      }
    },
    view: {
      base: "p-1"
    },
    footer: {
      base: "flex mt-2 space-x-2",
      button: {
        base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-primary-300",
        today: "bg-primary-700 text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700",
        clear: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      }
    }
  },
  views: {
    days: {
      header: {
        base: "grid grid-cols-7 mb-1",
        title: "dow h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400"
      },
      items: {
        base: "grid w-64 grid-cols-7",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 ",
          selected: "bg-primary-700 text-white hover:bg-primary-600",
          disabled: "text-gray-300 disabled"
        }
      }
    },
    months: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          selected: "bg-primary-700 text-white hover:bg-primary-600",
          disabled: "text-gray-300 disabled"
        }
      }
    },
    years: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
          selected: "bg-primary-700 text-white hover:bg-primary-600",
          disabled: "text-gray-300 disabled"
        }
      }
    },
    decades: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900",
          selected: "bg-primary-700 text-white hover:bg-primary-600",
          disabled: "text-gray-300 disabled"
        }
      }
    }
  }
};
const DateChangeModal = ({
  restrictedUntil,
  setRestrictedUntil,
  setDateChangeModalOpen,
  maxDate,
  title,
  description = null
}) => {
  const [date, setDate] = useState(restrictedUntil.toJSDate());
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg w-[30rem]", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-medium text-lg", children: title }),
    description !== null && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 py-2", children: description }),
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
      Datepicker,
      {
        defaultValue: date,
        showClearButton: false,
        showTodayButton: false,
        minDate: /* @__PURE__ */ new Date(),
        maxDate: maxDate.toJSDate(),
        theme: datePickerTheme,
        onChange: (date2) => {
          if (date2 !== null) {
            setDate(date2);
          } else {
            void logger$1.warn("Datepicker onChange received a null value, this shouldn't happen!");
          }
        },
        inline: true
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-4 mt-4", children: [
      /* @__PURE__ */ jsx("button", { className: "px-4 py-2 btn normal-case", onClick: () => setDateChangeModalOpen(false), children: "Cancel" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "px-4 py-2 btn loculusColor text-white normal-case",
          onClick: () => {
            setRestrictedUntil(DateTime.fromJSDate(date));
            setDateChangeModalOpen(false);
          },
          children: "Save"
        }
      )
    ] })
  ] }) });
};

const logger = getClientLogger("DatauseTermsSelector");
const DataUseTermsSelector = ({
  initialDataUseTermsOption = null,
  maxRestrictedUntil,
  calendarUseModal = false,
  setDataUseTerms,
  calendarDescription = null
}) => {
  const setDataUseTermsWithValues = (newOption, newDate) => {
    switch (newOption) {
      case openDataUseTermsOption:
        setDataUseTerms({ type: openDataUseTermsOption });
        break;
      case restrictedDataUseTermsOption:
        setDataUseTerms({
          type: restrictedDataUseTermsOption,
          restrictedUntil: newDate.toFormat("yyyy-MM-dd")
        });
        break;
    }
  };
  const [selectedOption, setSelectedOptionInternal] = useState(initialDataUseTermsOption);
  const [selectedDate, setSelectedDateInternal] = useState(maxRestrictedUntil);
  const setSelectedOption = (newOption) => {
    setSelectedOptionInternal(newOption);
    setDataUseTermsWithValues(newOption, selectedDate);
  };
  const setSelectedDate = (newDate) => {
    setSelectedOptionInternal(restrictedDataUseTermsOption);
    setSelectedDateInternal(newDate);
    setDataUseTermsWithValues(restrictedDataUseTermsOption, newDate);
  };
  const [dateChangeModalOpen, setDateChangeModalOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    dateChangeModalOpen && /* @__PURE__ */ jsx(
      DateChangeModal,
      {
        title: "Change date until which sequences are restricted",
        description: calendarDescription,
        restrictedUntil: selectedDate,
        setRestrictedUntil: setSelectedDate,
        setDateChangeModalOpen,
        maxDate: maxRestrictedUntil
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "data-use-open",
          name: "data-use",
          onChange: () => setSelectedOption(openDataUseTermsOption),
          type: "radio",
          checked: selectedOption === openDataUseTermsOption,
          className: "h-4 w-4 p-2 border-gray-300 text-primary-600 focus:ring-primary-600 inline-block"
        }
      ),
      /* @__PURE__ */ jsxs("label", { htmlFor: "data-use-open", className: "ml-2 h-4 p-2 text-sm font-medium leading-6 text-gray-900", children: [
        /* @__PURE__ */ jsx(ForwardRef, { className: "h-4 w-4 inline-block mr-2 -mt-1" }),
        "Open"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs pl-8 text-gray-500 pb-4", children: [
        "Anyone can use and share the data (though we believe researchers should exercise scientific etiquette, including the importance of citation).",
        " ",
        /* @__PURE__ */ jsx("a", { href: "/about/terms-of-use/open-data", className: "text-primary-600", children: "Find out more" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "data-use-restricted",
          name: "data-use",
          onChange: () => setSelectedOption(restrictedDataUseTermsOption),
          type: "radio",
          checked: selectedOption === restrictedDataUseTermsOption,
          className: "h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600 inline-block"
        }
      ),
      /* @__PURE__ */ jsxs(
        "label",
        {
          htmlFor: "data-use-restricted",
          className: "ml-2 h-4 p-2 text-sm font-medium leading-6 text-gray-900",
          children: [
            /* @__PURE__ */ jsx(ForwardRef$1, { className: "h-4 w-4 inline-block mr-2 -mt-1" }),
            "Restricted use"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "text-xs pl-8 text-gray-500 mb-4", children: [
        "Data use will be restricted for a period of time. The sequences will be available but there will be limitations on how they can be used by others.",
        " ",
        /* @__PURE__ */ jsx("a", { href: "/about/terms-of-use/restricted-data", className: "text-primary-600", children: "Find out more" }),
        "."
      ] }),
      selectedOption === restrictedDataUseTermsOption && !calendarUseModal && /* @__PURE__ */ jsxs(Fragment, { children: [
        calendarDescription !== null && /* @__PURE__ */ jsx("p", { className: "ml-8 text-xs text-gray-500 mb-4", children: calendarDescription }),
        /* @__PURE__ */ jsx(
          Datepicker,
          {
            className: "ml-8",
            defaultValue: selectedDate.toJSDate(),
            showClearButton: false,
            showTodayButton: false,
            minDate: /* @__PURE__ */ new Date(),
            maxDate: maxRestrictedUntil.toJSDate(),
            theme: datePickerTheme,
            onChange: (date) => {
              if (date !== null) {
                setSelectedDate(DateTime.fromJSDate(date));
              } else {
                void logger.warn(
                  "Datepicker onChange received a null value, this shouldn't happen!"
                );
              }
            },
            inline: true
          }
        )
      ] }),
      selectedOption === restrictedDataUseTermsOption && /* @__PURE__ */ jsxs("span", { className: "py-4 text-sm ml-8", children: [
        "Data use will be restricted until ",
        /* @__PURE__ */ jsx("b", { children: selectedDate.toFormat("yyyy-MM-dd") }),
        ".",
        " ",
        calendarUseModal && /* @__PURE__ */ jsx("button", { className: "border rounded px-2 py-1", onClick: () => setDateChangeModalOpen(true), children: "Change date" })
      ] })
    ] })
  ] });
};

export { DataUseTermsSelector as D };

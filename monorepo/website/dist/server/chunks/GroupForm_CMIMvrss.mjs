import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { D as DisabledUntilHydrated } from './DisabledUntilHydrated_Cq3qsxAK.mjs';
import { E as ErrorFeedback } from './ErrorFeedback_TZcsGLkd.mjs';

const listOfCountries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Ashmore and Cartier Islands",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Baker Island",
  "Bangladesh",
  "Barbados",
  "Bassas da India",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Borneo",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Clipperton Island",
  "Cocos Islands",
  "Colombia",
  "Comoros",
  "Cook Islands",
  "Coral Sea Islands",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Europa Island",
  "Falkland Islands (Islas Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern and Antarctic Lands",
  "Gabon",
  "Gambia",
  "Gaza Strip",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Glorioso Islands",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Honduras",
  "Hong Kong",
  "Howland Island",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Jan Mayen",
  "Japan",
  "Jarvis Island",
  "Jersey",
  "Johnston Atoll",
  "Jordan",
  "Juan de Nova Island",
  "Kazakhstan",
  "Kenya",
  "Kerguelen Archipelago",
  "Kingman Reef",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Line Islands",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Midway Islands",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Navassa Island",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "North Korea",
  "North Macedonia",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palmyra Atoll",
  "Panama",
  "Papua New Guinea",
  "Paracel Islands",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn Islands",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of the Congo",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Barthelemy",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Korea",
  "South Sudan",
  "Spain",
  "Spratly Islands",
  "Sri Lanka",
  "State of Palestine",
  "Sudan",
  "Suriname",
  "Svalbard",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tromelin Island",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "USA",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Virgin Islands",
  "Wake Island",
  "Wallis and Futuna",
  "West Bank",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

const CountryInputNoOptionChosen = "Choose a country...";
const fieldMapping = {
  groupName: "groupName",
  institution: "institution",
  contactEmail: "contactEmail",
  country: "country",
  line1: "line1",
  line2: "line2",
  city: "city",
  state: "state",
  postalCode: "postalCode"
};
const groupCreationCssClass = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6";
const LabelledInputContainer = ({ children, label, htmlFor, className, required }) => /* @__PURE__ */ jsxs("div", { className, children: [
  /* @__PURE__ */ jsxs("label", { htmlFor, className: "block text-sm font-medium leading-6 text-gray-900", children: [
    label,
    required === true && /* @__PURE__ */ jsx("span", { className: "ml-1 text-red-600", children: "*" })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "mt-1", children })
] });
const TextInput = ({ className, label, name, required, type, defaultValue }) => /* @__PURE__ */ jsx(LabelledInputContainer, { className, label, htmlFor: name + "-input", required, children: /* @__PURE__ */ jsx(
  "input",
  {
    type,
    name,
    id: name + "-input",
    required,
    className: groupCreationCssClass,
    autoComplete: type === "email" ? "email" : void 0,
    defaultValue
  }
) });
const GroupNameInput = ({ defaultValue }) => /* @__PURE__ */ jsx(
  TextInput,
  {
    className: "sm:col-span-4",
    type: "text",
    label: "Group name",
    name: fieldMapping.groupName,
    required: true,
    defaultValue
  }
);
const InstitutionNameInput = ({ defaultValue }) => /* @__PURE__ */ jsx(
  TextInput,
  {
    className: "sm:col-span-4",
    type: "text",
    label: "Institution",
    name: fieldMapping.institution,
    required: true,
    defaultValue
  }
);
const EmailContactInput = ({ defaultValue }) => /* @__PURE__ */ jsx(
  TextInput,
  {
    className: "sm:col-span-4",
    type: "email",
    label: "Contact email address",
    name: fieldMapping.contactEmail,
    required: true,
    defaultValue
  }
);
const CountryInput = ({ defaultValue }) => /* @__PURE__ */ jsx(
  LabelledInputContainer,
  {
    label: "Country",
    htmlFor: fieldMapping.country + "-input",
    className: "sm:col-span-3",
    required: true,
    children: /* @__PURE__ */ jsxs(
      "select",
      {
        id: fieldMapping.country + "-input",
        name: fieldMapping.country,
        required: true,
        autoComplete: "country-name",
        className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6",
        defaultValue,
        children: [
          /* @__PURE__ */ jsx("option", { children: CountryInputNoOptionChosen }),
          listOfCountries.map((country) => /* @__PURE__ */ jsx("option", { value: country, children: country }, country))
        ]
      }
    )
  }
);
const AddressLineOneInput = ({ defaultValue }) => /* @__PURE__ */ jsx(
  TextInput,
  {
    className: "col-span-full",
    type: "text",
    label: "Address Line 1",
    name: fieldMapping.line1,
    required: true,
    defaultValue
  }
);
const AddressLineTwoInput = ({ defaultValue }) => /* @__PURE__ */ jsx(
  TextInput,
  {
    className: "col-span-full",
    type: "text",
    label: "Address Line 2",
    name: fieldMapping.line2,
    required: false,
    defaultValue
  }
);
const CityInput = ({ defaultValue }) => /* @__PURE__ */ jsx(
  TextInput,
  {
    className: "sm:col-span-2 sm:col-start-1",
    type: "text",
    label: "City",
    name: fieldMapping.city,
    required: true,
    defaultValue
  }
);
const StateInput = ({ defaultValue }) => /* @__PURE__ */ jsx(
  TextInput,
  {
    className: "sm:col-span-2",
    type: "text",
    label: "State / Province",
    name: fieldMapping.state,
    required: false,
    defaultValue
  }
);
const PostalCodeInput = ({ defaultValue }) => /* @__PURE__ */ jsx(
  TextInput,
  {
    className: "sm:col-span-2",
    type: "text",
    label: "ZIP / Postal code",
    name: fieldMapping.postalCode,
    required: true,
    defaultValue
  }
);
const groupFromFormData = (formData) => {
  const getField = (key) => formData.get(fieldMapping[key]);
  return {
    groupName: getField("groupName"),
    institution: getField("institution"),
    contactEmail: getField("contactEmail"),
    address: {
      line1: getField("line1"),
      line2: getField("line2"),
      city: getField("city"),
      postalCode: getField("postalCode"),
      state: getField("state"),
      country: getField("country")
    }
  };
};

const GroupForm = ({ title, buttonText, defaultGroupData, onSubmit }) => {
  const [errorMessage, setErrorMessage] = useState(void 0);
  const internalOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const group = groupFromFormData(formData);
    if (group.address.country === CountryInputNoOptionChosen) {
      setErrorMessage("Please choose a country");
      return false;
    }
    const result = await onSubmit(group);
    if (result.succeeded) {
      window.location.href = result.nextPageHref;
    } else {
      setErrorMessage(result.errorMessage);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-4 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "title", children: title }),
    errorMessage !== void 0 && /* @__PURE__ */ jsx(ErrorFeedback, { message: errorMessage, onClose: () => setErrorMessage(void 0) }),
    /* @__PURE__ */ jsx("form", { onSubmit: (event) => void internalOnSubmit(event), children: /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-900/10 pb-12 ", children: [
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm leading-6 text-gray-600", children: "The information you enter on this form will be publicly available on your group page." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6", children: [
        /* @__PURE__ */ jsx(GroupNameInput, { defaultValue: defaultGroupData?.groupName }),
        /* @__PURE__ */ jsx(EmailContactInput, { defaultValue: defaultGroupData?.contactEmail }),
        /* @__PURE__ */ jsx(InstitutionNameInput, { defaultValue: defaultGroupData?.institution }),
        /* @__PURE__ */ jsx(AddressLineOneInput, { defaultValue: defaultGroupData?.address.line1 }),
        /* @__PURE__ */ jsx(AddressLineTwoInput, { defaultValue: defaultGroupData?.address.line2 }),
        /* @__PURE__ */ jsx(CityInput, { defaultValue: defaultGroupData?.address.city }),
        /* @__PURE__ */ jsx(StateInput, { defaultValue: defaultGroupData?.address.state }),
        /* @__PURE__ */ jsx(PostalCodeInput, { defaultValue: defaultGroupData?.address.postalCode }),
        /* @__PURE__ */ jsx(CountryInput, { defaultValue: defaultGroupData?.address.country })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end py-8 gap-4 ", children: /* @__PURE__ */ jsx(DisabledUntilHydrated, { children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary px-4 py-2 loculusColor text-white rounded", children: buttonText }) }) })
    ] }) })
  ] });
};

export { GroupForm as G };

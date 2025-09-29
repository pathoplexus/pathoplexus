const extractAccessionVersion = (accessionVersion) => ({
  accession: accessionVersion.accession,
  version: accessionVersion.version
});
const getAccessionVersionString = (accessionVersion) => {
  if (typeof accessionVersion === "string") {
    return accessionVersion;
  }
  return `${accessionVersion.accession}.${accessionVersion.version}`;
};
const parseAccessionVersionFromString = (accessionVersionString) => {
  const parts = accessionVersionString.split(".");
  switch (parts.length) {
    case 1:
      return { accession: parts[0], version: void 0 };
    default: {
      const version = Number(parts.pop());
      const accession = parts.join(".");
      return { accession, version: isNaN(version) ? void 0 : version };
    }
  }
};

export { extractAccessionVersion as e, getAccessionVersionString as g, parseAccessionVersionFromString as p };

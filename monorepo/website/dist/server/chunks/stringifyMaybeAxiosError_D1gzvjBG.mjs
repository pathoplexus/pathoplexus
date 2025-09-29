const stringifyMaybeAxiosError = (error) => {
  const data = error.response?.data;
  if (typeof data === "object" && data !== null) {
    return data.detail;
  }
  return JSON.stringify(error.message);
};

export { stringifyMaybeAxiosError as s };

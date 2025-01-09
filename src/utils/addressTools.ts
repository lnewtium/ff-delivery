export type valuesType = {
  full_name: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
};

export type errorsType = {
  full_name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export const validateAddress = (values: valuesType) => {
  let newErrors: errorsType = {};
  if (!values.full_name) {
    newErrors = {
      full_name: "Name is required",
    };
  }
  if (!values.address) {
    newErrors = {
      ...newErrors,
      address: "Address is required",
    };
  }
  if (!values.city) {
    newErrors = {
      ...newErrors,
      city: "City is required",
    };
  }
  if (!values.state) {
    newErrors = {
      ...newErrors,
      state: "State is required",
    };
  }
  if (!values.zip || values.zip.length !== 5) {
    newErrors = {
      ...newErrors,
      zip: "Bad zip code",
    };
  }
  return newErrors;
};

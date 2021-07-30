type BasicWithNested = {
  first_name?: string;
  last_name?: string;
  birthday?: string;
  country?: string;
  address?: {
    street?: string;
  }
};

export default BasicWithNested;


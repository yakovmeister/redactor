type NestedWithArray = {
  names?: {
    first?: string;
    last?: string;
  }[];
  address?: {
    street?: string;
    city?: string;
  };
};

export default NestedWithArray;


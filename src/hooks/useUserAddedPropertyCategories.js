import { useQuery } from "@tanstack/react-query";
import { userDetailsAPIs } from "../features/user-details/api";
import { toast } from "sonner";

const useUserAddedPropertyCategories = ({ userId }) => {
  const { data, isError } = useQuery({
    queryKey: ["userAddedPropertyCategories"],
    queryFn: () =>
      userDetailsAPIs.fetchUserAddedPropertyCategories({ userId: userId }),
  });

  if (isError) {
    return toast.error("Error fetching User Added Property Categories", {
      duration: 3000,
    });
  }

  const updatedCategoriesArray = data?.categories?.map((category) => ({
    ...category,
    label: `${category.value}`,
  }));

  return updatedCategoriesArray || [];
};

export default useUserAddedPropertyCategories;

"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type FoodContextType = {
  foods: FoodType[];
  categories: CategoryType[];
  refetchFoods: () => Promise<void>;
  loading: Boolean;
};

//creating context
const FoodContext = createContext<FoodContextType>({} as FoodContextType);

//wrapper component
export const FoodProvider = ({ children }: Props) => {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const getCategories = async () => {
    setLoading(true);
    const result = await fetch("http://localhost:4000/api/categories");
    const responseData = await result.json();
    const { data } = responseData;
    setCategories(data);
    setLoading(false);
  };

  const getFoods = async () => {
    setLoading(true);
    const result = await fetch("http://localhost:4000/api/food");
    const responseData = await result.json();
    setFoods(responseData.data);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  return (
    <FoodContext.Provider
      value={{ foods, categories, refetchFoods: getFoods, loading }}
    >
      {children}
    </FoodContext.Provider>
  );
};

//usage
export const useData = () => {
  return useContext(FoodContext);
};

//challange
// ene useData gaas zovhon foods/categories garch irj baigaag saijruul:
// refetchFoods gargaj ireh
// loading gargaj ireh

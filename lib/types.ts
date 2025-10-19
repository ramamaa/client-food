type FoodType = {
  image: string;
  _id: string;
  price: number;
  ingredients: string;
  categoryId: CategoryType;
  name: string;
};
type CategoryType = {
  _id: string;
  name: string;
};

import React from "react";
import MealsList from "./MealsList";
import MealsSummary from "./MealsSummary";
const Meals = () => {
  return (
    <React.Fragment>
      <MealsSummary />
      <MealsList />
    </React.Fragment>
  );
};
export default Meals;

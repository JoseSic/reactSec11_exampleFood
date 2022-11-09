import React, { useEffect, useState } from "react";
import Classes from "./MealsList.module.css";
import MealtItem from "./MealItem";
import Card from "../UI/Card";

const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);

  useEffect(() => {
    const loadMealData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/meals/");
        if (!response.ok) {
          throw new Error("Someting went wrong!");
        }

        const data = await response.json();
        setMeals(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        setError(error.message);
      }
    };
    loadMealData();
    /*  setTimeout(() => {
      loadMealData();
    }, 7000);  */
  }, []);
  const mealList = meals.map((meals) => (
    <MealtItem
      key={meals.id}
      id={meals.id}
      name={meals.name}
      description={meals.description}
      price={meals.price}
    />
  ));

  const cardContent = isLoading ? (
    <section className={Classes.loading}>
      <h2>Is Loading...!</h2>{" "}
    </section>
  ) : (
    <ul>{mealList}</ul>
  );

  const errorMessage = (
    <section className={Classes.loading}>
      <h2>{isError}</h2>
    </section>
  );
  return (
    <section className={Classes.meals}>
      <Card>
        {!isError && cardContent}
        {isError && !isLoading && errorMessage}
      </Card>
    </section>
  );
};

export default MealsList;

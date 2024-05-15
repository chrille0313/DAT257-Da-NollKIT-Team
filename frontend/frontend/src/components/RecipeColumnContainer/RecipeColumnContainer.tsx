import { useEffect, useState } from "react";
import RecipeColumn from "../RecipeColumn/RecipeColumn";
import styles from './RecipeColumnContainer.module.css';
import { get } from '../../utils';
import { RecipeAPIResponse, Recipe } from '../../types';
import { useAppSelector } from "../../app/hooks";


const api_url = "http://127.0.0.1:5000/api/v1";
const recipe_url = api_url + "/recipes";

function RecipeColumnContainer() {
  const filters = useAppSelector(state => state.api.filters);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  async function fetchData() {
    const response = await get<RecipeAPIResponse>(recipe_url, filters);
    const responseRecipes = response.map((recipeResponse) => recipeResponse.recipe);
    setRecipes(responseRecipes);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.RecipeColumnContainer}>
      {recipes.map((recipe, index) => (
        <RecipeColumn key={index} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeColumnContainer;
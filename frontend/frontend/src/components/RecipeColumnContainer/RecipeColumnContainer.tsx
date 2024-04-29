import { useEffect, useState } from "react";
import RecipeColumn from "../RecipeColumn/RecipeColumn";
import styles from './RecipeColumnContainer.module.css';
import { get } from '../../utils';
import { RecipeAPIResponse, Recipe } from '../../types';


const api_url = "http://127.0.0.1:5000/api/v1";
const recipe_url = api_url + "/recipes";

function RecipeColumnContainer() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [lockedRecipes, setLockedRecipes] = useState<number[]>([]); // TODO: connect lock button here

  async function fetchData() {
    const response = await get<RecipeAPIResponse>(recipe_url);
    console.log(response)
    const responseRecipes = response.map((recipeResponse) => recipeResponse.recipe);
    for (var index of lockedRecipes) {
        responseRecipes[index] = recipes[index]
    }
    
    setRecipes(responseRecipes)
  };

  const toggleLockRecipe = (index: number) => {
   if (lockedRecipes.includes(index)) {
      lockedRecipes.splice(lockedRecipes.indexOf(index), 1)
   }
   else {
    lockedRecipes.push(index);
   }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.RecipeColumnContainer}>
      {recipes.map((recipe, index) => (
        <RecipeColumn key={index} recipe={recipe} onLockClick={() => toggleLockRecipe(index)} />
      ))}
    </div>
  );
}

export default RecipeColumnContainer;
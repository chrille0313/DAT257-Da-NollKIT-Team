import { useEffect, useState } from "react";
import RecipeColumn from "../RecipeColumn/RecipeColumn";
import styles from './RecipeColumnContainer.module.css';
import { get } from '../../utils';
import { RecipeAPIResponse, Recipe } from '../../types';
import RecipeColumnSkeleton from "../RecipeColumnSkeleton/RecipeColumnSkeleton";
import { Suspense } from 'react';
import Skeleton from "react-loading-skeleton";


const api_url = "http://127.0.0.1:5000/api/v1";
const recipe_url = api_url + "/recipes";

function RecipeColumnContainer() {  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [lockedRecipes, setLockedRecipes] = useState<number[]>([]); // TODO: connect lock button here
  const [loading, setLoading] = useState(false);

  
  async function fetchData() {
    setLoading(true)

    const response = await get<RecipeAPIResponse>(recipe_url);
    console.log(response)
    const responseRecipes = response.map((recipeResponse) => recipeResponse.recipe);
    for (var index of lockedRecipes) {
        responseRecipes[index] = recipes[index]
    }
    
    setRecipes(responseRecipes)

    setLoading(false)
  };

  const toggleLockRecipe = (index: number) => {
    // TODO: use setLockedRecipes instead of lockedRecipes
   if (lockedRecipes.includes(index)) {
      lockedRecipes.splice(lockedRecipes.indexOf(index), 1)
   }
   else {
    lockedRecipes.push(index);
   }
   console.log(lockedRecipes)
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.key === ' ' && lockedRecipes.length < recipes.length) {
        fetchData()
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const skeletonColumns = Array.from({ length: 5 }, (_, index) => (
    <RecipeColumnSkeleton key={index} />
  ));

  return (
  
      <div className={styles.RecipeColumnContainer}  onKeyDown={handleKeyDown} tabIndex={0}>
        {loading ? ( 
          skeletonColumns
        ) : (
          recipes.map((recipe, index) => (
            <RecipeColumn key={index} recipe={recipe} onLockClick={() => toggleLockRecipe(index)} />
          ))
        )}
      </div>
  
  );
}

export default RecipeColumnContainer;
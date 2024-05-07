import { useEffect, useRef, useState } from "react";
import RecipeColumn from "../RecipeColumn/RecipeColumn";
import styles from './RecipeColumnContainer.module.css';
import { get } from '../../utils';
import { RecipeAPIResponse, Recipe } from '../../types';
import RecipeColumnSkeleton from "../RecipeColumnSkeleton/RecipeColumnSkeleton";
import { Suspense } from 'react';
import Skeleton from "react-loading-skeleton";
import React from "react";


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
    
    console.log(recipes)
    setRecipes(responseRecipes)
    console.log(recipes)

    setLoading(false)
  };

  const toggleLockRecipe = (index: number) => {
    const newLockedRecipes = lockedRecipes.slice();
   if (newLockedRecipes.includes(index)) {
    newLockedRecipes.splice(newLockedRecipes.indexOf(index), 1)
   }
   else {
    newLockedRecipes.push(index);
   }
   setLockedRecipes(newLockedRecipes)
  };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  //   event.preventDefault()
  //   if (event.key === ' ' && lockedRecipes.length < recipes.length) {
  //       fetchData()
  //   }
  // };  

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log()
    event.preventDefault()
    if (event.key === ' ' && lockedRecipes.length < recipes.length) {
      if (event.repeat) {
        return;
      }
      fetchData()
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  const skeletonColumns = Array.from({ length: 5 }, (_, index) => (
    lockedRecipes.includes(index) ? null : <RecipeColumnSkeleton key={index} />
  ));
  

  return (

    <div className={styles.RecipeColumnContainer} tabIndex={0}>
    {recipes.map((recipe, index) => (
      <React.Fragment key={index}>
        {(lockedRecipes.includes(index) || !loading) ? (
          <RecipeColumn key={index} recipe={recipe} onLockClick={() => toggleLockRecipe(index)} />
        ) : (
          <RecipeColumnSkeleton key={index} />
        )}
      </React.Fragment>
    ))}
  </div>
);
}

export default RecipeColumnContainer;
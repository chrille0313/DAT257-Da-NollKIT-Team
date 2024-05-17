import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import RecipeColumn from "../RecipeColumn";
import styles from './RecipeColumnContainer.module.css';
import { get } from '../../utils';
import { RecipeAPIResponse, Recipe } from '../../types';
import { useAppSelector } from "../../app/hooks";
import RecipeColumnSkeleton from "../RecipeColumnSkeleton";
import { Suspense } from 'react';
import React from "react";


interface LockableRecipe {
  recipe: Recipe;
  isLocked: boolean;
}

const api_url = "http://127.0.0.1:5000/api/v1";
const recipe_url = api_url + "/recipes";


export default function RecipeColumnContainer() {  
  const filters = useAppSelector(state => state.api.filters);
  const [recipes, setRecipes] = useState<LockableRecipe[]>([]);
  const [loading, setLoading] = useState(false);


  async function fetchData() {
    setLoading(true)

    const response = await get<RecipeAPIResponse>(recipe_url, filters);
    const responseRecipes = response.map(recipeResponse => recipeResponse.recipe);

    let newRecipes: LockableRecipe[] = []

    if (recipes.length != 0) {
      recipes.forEach(recipe => {
        if (recipe.isLocked) {
          newRecipes.push(recipe)
        }
        else {
          newRecipes.push({recipe: responseRecipes.shift()!, isLocked: false})
        }
      })
    }
    else {
      newRecipes = responseRecipes.map(recipe => ({recipe, isLocked: false}))
    }
    
    setRecipes(newRecipes)
    setLoading(false);
  };

  const toggleLockRecipe = (index: number) => {
    const newRecipes = [...recipes];
    newRecipes[index] = {...newRecipes[index], isLocked: !newRecipes[index].isLocked};
    setRecipes(newRecipes);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault()

    if (event.code === 'Space' && !event.repeat) {
      fetchData();
    } 
  }, [recipes]);

  useLayoutEffect(() => {
    fetchData(); 
  }, []);

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);

    return () => document.body.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);


  return (
    <div className={styles.RecipeColumnContainer} tabIndex={0}>
      {recipes.map((recipe, index) => (
          recipe.isLocked || !loading ?
            <RecipeColumn key={index} recipe={recipe.recipe} isLocked={recipe.isLocked} onToggleLock={() => toggleLockRecipe(index)} />
          :
            <RecipeColumnSkeleton key={index} />
      ))}
    </div>
  );
}
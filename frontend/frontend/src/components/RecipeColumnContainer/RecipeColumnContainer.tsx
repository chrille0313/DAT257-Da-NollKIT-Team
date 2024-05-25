import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Recipe, RecipeAPIResponse } from '../../types';
import { get } from '../../utils';
import { ExtractFilterValues } from '../FilterDropdown';
import RecipeColumn from '../RecipeColumn';
import RecipeColumnSkeleton from '../RecipeColumnSkeleton';
import styles from './RecipeColumnContainer.module.css';

interface LockableRecipe {
  recipe: Recipe;
  isLocked: boolean;
}

const api_url = 'http://127.0.0.1:5000/api/v1';
const recipe_url = api_url + '/recipes';

export default function RecipeColumnContainer() {
  const [recipes, setRecipes] = useState<LockableRecipe[]>([]);
  const recipesRef = useRef(recipes);
  recipesRef.current = recipes;

  const filters = useAppSelector((state) => state.api.filters);
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);

    const response = await get<RecipeAPIResponse>(
      recipe_url,
      ExtractFilterValues(filtersRef.current)
    );
    const responseRecipes = response.map(
      (recipeResponse) => recipeResponse.recipe
    );

    let newRecipes: LockableRecipe[] = [];

    if (recipesRef.current.length !== 0) {
      recipesRef.current.forEach((recipe) => {
        if (recipe.isLocked) {
          newRecipes.push(recipe);
        } else {
          newRecipes.push({
            recipe: responseRecipes.shift()!,
            isLocked: false,
          });
        }
      });
    } else {
      newRecipes = responseRecipes.map((recipe) => ({
        recipe,
        isLocked: false,
      }));
    }

    setRecipes(newRecipes);
    setLoading(false);
  }, []);

  const toggleLockRecipe = (index: number) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe, i) => {
        if (i === index) {
          return { ...recipe, isLocked: !recipe.isLocked };
        } else {
          return recipe;
        }
      })
    );
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();

      if (event.code === 'Space' && !event.repeat) {
        fetchData();
      }
    },
    [fetchData]
  );

  useEffect(() => {
    fetchData();

    document.body.addEventListener('keydown', handleKeyDown);

    return () => document.body.removeEventListener('keydown', handleKeyDown);
  }, [fetchData, handleKeyDown]);

  return (
    <div className={styles.RecipeColumnContainer} tabIndex={0}>
      {recipes.map((recipe, index) =>
        recipe.isLocked || !loading ? (
          <RecipeColumn
            key={index}
            recipe={recipe.recipe}
            isLocked={recipe.isLocked}
            onToggleLock={() => toggleLockRecipe(index)}
          />
        ) : (
          <RecipeColumnSkeleton key={index} />
        )
      )}
    </div>
  );
}

import { useState } from "react";
import RecipeColumn, { Recipe } from "../RecipeColumn/RecipeColumn";
import styles from './RecipeColumnContainer.module.css';


function RecipeColumnContainer() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      title: 'Kängurufamilj',
      ingredients: [
        ['Example ingredient', '1 tsk'],
        ['Oskyldigt kängurubarn', '1 st'],
        ['Kärleksfull Kängurumamma', '1 st'],
        ['Smör', '5 msk'],
        ['Timjan', '1 knippe'],
        ['Salt', 'Massor'],
        ['Peppar', 'Lite mindre'],
        ['Vitlök', '4 klyftor']
      ]
    },
    {
      title: 'F1 seger',
      ingredients: [
        ['DUN', '4'],
        ['MAX VERSTAPPEN', '1'],
      ]    },
    {
      title: 'Hästlasagne',
      ingredients: [
        ['Finduslasagne', '1 st']
      ]    },
    {
      title: 'Kängurfamilj',
      ingredients: [['Example ingredient', '1 tsk']]    },
    {
      title: 'Kängurfamilj',
      ingredients: [['Example ingredient', '1 tsk']]    },
  ]);

  return (
    <div className={styles.RecipeColumnContainer}>
      {recipes.map((recipe, index) => (
        <RecipeColumn key={index} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeColumnContainer;
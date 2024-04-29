import styles from './RecipeColumn.module.css';
import kangaroo from '../../static/images/kangaroo.jpg';
import kangaroo2 from '../../static/images/kram-med-ru.jpg';
import { Recipe } from '../../types';

interface RecipeColumnProps {
  recipe: Recipe
  onLockClick: () => void;
}

function RecipeColumn({recipe, onLockClick}: RecipeColumnProps) {

  const handleLockClick = () => {
    onLockClick(); 
  };
  
  return (
    <article className={styles. RecipeContainer}>
      {/* <button onClick={handleLockClick}> # Example button for column locking, remove if necesarry
      Lock column
      </button> */}
      <div className={styles.RecipeImageContainer}>
        <img src={kangaroo2} alt='Tasty kangaroo meat' />
        <div className={styles.ImageTextOverlay}>
          <p>{recipe.totalTime} min</p>
          <p>{recipe.yield} portions</p>
        </div>
      </div>

      <div className={styles.RecipeInfoContainer}>
        <h2 className={styles.RecipeTitle}>{recipe.label}</h2>
        <hr />
        <div className={styles.IngredientsContainer}>
          <h3 className={styles.RecipeSubtitle}>Ingredients</h3>

          <table className={styles.IngredientsTable}>
            {recipe.ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>{ingredient.food}</td>
                <td>{ingredient.quantity} {ingredient.measure}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </article>
  );
}


export default RecipeColumn;
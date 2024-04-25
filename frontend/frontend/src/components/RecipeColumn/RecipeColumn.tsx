import styles from './RecipeColumn.module.css';
import kangaroo from '../../static/images/kangaroo.jpg';
import kangaroo2 from '../../static/images/kram-med-ru.jpg';


export type Recipe = {
  title: string;
  ingredients: string[][];
  //amounts: string[];
}

interface RecipeColumnProps {
  recipe: Recipe
}


function RecipeColumn({recipe}: RecipeColumnProps) {

  return (
    <article className={styles. RecipeContainer}>
      <div className={styles.RecipeImageContainer}>
        <img src={kangaroo2} alt='Tasty kangaroo meat' />
        <div className={styles.ImageTextOverlay}>
          <p>60 min</p>
          <p>4 portions</p>
        </div> {/* Add text overlay */}
      </div>

      <div className={styles.RecipeInfoContainer}>
        <h2 className={styles.RecipeTitle}>{recipe.title}</h2>
        <hr />
        <div className={styles.IngredientsContainer}>
          <h3 className={styles.RecipeSubtitle}>Ingredients</h3>

          <table className={styles.IngredientsTable}>
            {recipe.ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>{ingredient[0]}</td>
                <td>{ingredient[1]}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </article>
  );
}


export default RecipeColumn;
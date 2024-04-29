import styles from './RecipeColumn.module.css';
import kangaroo from '../../static/images/kangaroo.jpg';
import kangaroo2 from '../../static/images/kram-med-ru.jpg';
import { Recipe } from '../../types';
import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface RecipeColumnProps {
  recipe: Recipe
}

function RecipeColumn({recipe}: RecipeColumnProps) {
  
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <article className={styles.RecipeContainer}>
      <div className={styles.RecipeImageContainer}> 
        
        <img src={recipe.image} alt='Tasty kangaroo meat'></img>
        <div className={styles.ImageTextOverlay}>
          <p>{recipe.totalTime} min</p>
          <p>{recipe.yield} portions</p>
        </div>
      </div>

      <div className={styles.RecipeInfoContainer}>
        <div className={styles.RecipeTitleContainer}>
          <h2 className={styles.RecipeTitle}>{recipe.label}</h2>
        </div>
        <div className = {styles.EmissionContainer}>
          <div className={styles.EmissionsClass}>
            <p>{recipe.co2EmissionsClass} </p>
          </div>
          
            <Box sx={{ width: '80%' }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
        
        </div>
      </div>
    </article>
  );
}


export default RecipeColumn;
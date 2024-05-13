import styles from './RecipeColumn.module.css';
import kangaroo from '../../static/images/kangaroo.jpg';
import kangaroo2 from '../../static/images/kram-med-ru.jpg';
import { Recipe } from '../../types';
import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Button, IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileDownloadDoneOutlinedIcon from '@mui/icons-material/FileDownloadDoneOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

interface RecipeColumnProps {
  recipe: Recipe
  isLocked: boolean;
  onToggleLock: () => void;
}

function RecipeColumn({recipe, isLocked, onToggleLock}: RecipeColumnProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {

        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return 50;
      });
    }, 500);
    return () => {
      clearInterval(timer);
    }
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
          {/*
          <div className={styles.EmissionsClass}>
            <p>{recipe.co2EmissionsClass} </p>
          </div>
          */}
            <Box sx={{ width: '80%' }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
            <div>
                1.39
            </div>
        
        </div>
      </div>
      
      <div className={styles.HoverOverlay}>
        <div className={styles.HoverButtonGroup}>
          <IconButton className={styles.IconButton}>
            <ClearOutlinedIcon/>
          </IconButton>
          <IconButton className={styles.IconButton}>
            <FileDownloadOutlinedIcon/>
          </IconButton>
          <IconButton className={styles.IconButton}>
            <InfoOutlinedIcon />
          </IconButton>

          <IconButton className={styles.IconButton} onClick={onToggleLock}>
            {isLocked ? <LockIcon /> : <LockOpenIcon />}
          </IconButton>
        </div>
      </div>
    </article>
  );
}


export default RecipeColumn;
import styles from './RecipeColumn.module.css';
import { Recipe } from '../../types';
import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { IconButton } from '@mui/material';
import { Lock, LockOpen, InfoOutlined, FileDownloadOutlined, FileDownloadDoneOutlined, ClearOutlined } from '@mui/icons-material';
import LinesEllipsis from 'react-lines-ellipsis'


interface RecipeColumnProps {
  recipe: Recipe
  isLocked: boolean;
  onToggleLock: () => void;
}

function defaultYield(props: number) {
  if(props === 0) {
    return 'unknown';
  }
  return props + ' portions';
}

function defaultTime(props: number) {
  if(props === 0) {
    return 'unknown';
  }
  return props + ' min';
}

// 0.5 - 1.8
function Clamp(props: number) {
  return Math.max(0, Math.min(props, 1.8));
}

function Normalize(props: number) {
  return (props - 0) / (1.8 - 0)
}

function ToKilogram(props:number) {
  return props / 1000
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
        <img src={recipe.image} />
        
        <div className={styles.ImageTextOverlay}>
          <div className={styles.HoverButtonsContainer}>
            <IconButton className={styles.IconButton}>
              <ClearOutlined />
            </IconButton>
            <IconButton className={styles.IconButton}>
              <FileDownloadOutlined />
            </IconButton>
            <IconButton className={styles.IconButton}>
              <InfoOutlined />
            </IconButton>
            <IconButton className={styles.IconButton} onClick={onToggleLock}>
              {isLocked ? <Lock /> : <LockOpen />}
            </IconButton>
          </div>

          <p>{defaultTime(recipe.totalTime)}</p>
          <p>{defaultYield(recipe.yield)}</p>
        </div>
      </div>

      <div className={styles.RecipeInfoContainer}>
        <div className={styles.RecipeTitleContainer}>
          <h2 className={styles.RecipeTitle}>
          <LinesEllipsis
            text={recipe.label}
            maxLine='3'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />
          </h2>
        </div>
        <div className = {styles.EmissionContainer}>
          {/*
          <div className={styles.EmissionsClass}>
            <p>{recipe.co2EmissionsClass} </p>
          </div>
          */}
            <div className ={styles.ProgressBar}>
            <Box sx={{ width: '100%' }}>
              <LinearProgress
                variant="determinate"
                value={100 - Normalize(Clamp(ToKilogram(recipe.totalCO2Emissions/recipe.yield)))*100}
                sx={{background: 'linear-gradient(to right, #FF0000,#FFFF00,#008000)',
                '> span': { backgroundColor: 'gray', direction: 'rtl',
                },
                
                }}
                />
            </Box>
            </div>
            <div>
                {ToKilogram(Math.trunc(recipe.totalCO2Emissions/recipe.yield))}
            </div>
            <p className = {styles.COtag}>CO<sub className = {styles.COtag2}>2</sub></p>
        </div>
      </div>
      
      <div className={styles.HoverOverlay} />
    </article>
  );
}

export default RecipeColumn;
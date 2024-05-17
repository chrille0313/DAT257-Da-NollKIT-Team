import styles from './RecipeColumn.module.css';
import { Recipe } from '../../types';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { IconButton } from '@mui/material';
import { Lock, LockOpen, InfoOutlined, FileDownloadOutlined, FileDownloadDoneOutlined, ClearOutlined } from '@mui/icons-material';
import LinesEllipsis from 'react-lines-ellipsis'
import { useState, useEffect } from 'react';
import { Clamp } from '../../utils/Math';


const MAX_CO2 = 1.8;


interface RecipeColumnProps {
  recipe: Recipe
  isLocked: boolean;
  onToggleLock: () => void;
}

function formatValueWithDefault(value: number, suffix: string, default_value: any = 'unknown') {
  return value === 0 ? default_value : `${value} ${suffix}`;
}

function Normalize(value: number, min: number, max: number) {
  const clampedValue = Clamp(value, min, max)
  return (clampedValue - min) / (max - min)
}

function ToKilo(value: number) {
  return value / 1000
}

export default function RecipeColumn({recipe, isLocked, onToggleLock}: RecipeColumnProps) {

  const getProgress = (value: number, min: number, max: number) => {
    return 100 - Normalize(value, min, max) * 100;
  }

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

          <p>{formatValueWithDefault(recipe.totalTime, 'min')}</p>
          <p>{formatValueWithDefault(recipe.yield, 'portions')}</p>
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
          <div className ={styles.ProgressBar}>
            <LinearProgress
              variant="determinate"
              value={getProgress(ToKilo(recipe.totalCO2Emissions/recipe.yield), 0, MAX_CO2)}
              sx={{
                background: 'linear-gradient(to right, #008000, #FFFF00, #FF0000)',
                '> span': { backgroundColor: 'gray' },
              }}
            />
          </div>

          <p className={styles.COtag}>
            {ToKilo(Math.trunc(recipe.totalCO2Emissions/recipe.yield))} CO<sub>2</sub>
          </p>
        </div>
      </div>
      
      <div className={styles.HoverOverlay} />
    </article>
  );
}
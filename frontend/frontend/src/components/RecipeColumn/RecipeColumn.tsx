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
import Popup from '../InfoPopUp/InfoPopUp';


interface RecipeColumnProps {
  recipe: Recipe
}

// 0.5 - 1.8
function Clamp(props:number) {
  return Math.max(0, Math.min(props, 1.8));
}

function Normalize(props:number) {
  return (props - 0)/(1.8-0)
}

function ToKilogram(props:number) {
  return props/1000
}

function RecipeColumn({recipe}: RecipeColumnProps) {

  // Info Button
  const HandleInfoClick = () => {
    window.location.href = recipe.url
  }

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

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
        <div className={styles.HoverButtonGroup}>
          <IconButton className={styles.IconButton}>
            <ClearOutlinedIcon/>
          </IconButton>
          <IconButton className={styles.IconButton}>
            <FileDownloadOutlinedIcon/>
          </IconButton>
          <IconButton className={styles.IconButton} onClick={handleOpenPopup}>
            <InfoOutlinedIcon />
          </IconButton>
          {isPopupOpen && <Popup onClose={handleClosePopup}>
            
            <h2>This is a popup</h2>
            <p>Some content goes here...</p>

          </Popup>}
          <IconButton className={styles.IconButton}>
            <LockOpenIcon />
          </IconButton>
        </div>
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
            <div className ={styles.ProgressBar}>
            <Box sx={{ width: '80%' }}>
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
      
      <div className={styles.HoverOverlay}>
      </div>
    </article>
  );
}


export default RecipeColumn;
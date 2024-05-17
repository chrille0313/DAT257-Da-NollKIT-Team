// src/components/CustomModal.tsx
import React, { ReactNode } from 'react';
import { Modal, Box, Button } from '@mui/material';
import styles from './CustomModal.module.css';
import { Recipe } from '../../types'; 

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode; // Declare the children prop
  recipe: Recipe;
}

export default function CustomModal ({ open, onClose, children, recipe }: CustomModalProps) {
  return (
    <Modal className={styles.modalBackground} open={open} onClose={onClose}>
      <Box className={styles.infoContainer}>
        <div className={styles.InfoContainerSplit}>
           {/* TODO: Carousel for multiple images */}
          <img className = {styles.FoodImage} src={recipe.image} alt='Picture of food'></img> 
        </div>
        <div className={styles.InfoContainerSplit}>
          <div className = {styles.NavbarContainer}>
            <div className={styles.CloseButtonContainer}>
              <Button onClick={onClose} className={styles.closeButton}>
                <div className={styles.closeButtonText} >
                  X
                </div>        
              </Button>
            </div>
          </div>
          <div className =  {styles.RecipeTitle}>
            <a className = {styles.RecipeLink}  href={recipe.url} target="_blank"> 
              <h1 className={styles.RecipeTitleText} > {recipe.label}</h1>
            </a>
          </div>
          <div className={styles.RecipeContentSplit}>

              <div className={styles.RecipeContentSplit}>
              <div className ={styles.Ingredients}>
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
              </div>      
          </div>

          {children}
        </div>
      </Box>
    </Modal>
  );
};
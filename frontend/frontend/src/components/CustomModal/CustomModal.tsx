import styles from './CustomModal.module.css';
import { PropsWithChildren } from 'react';
import { CloseRounded } from '@mui/icons-material';
import { Modal, Box, IconButton, Divider } from '@mui/material';
import { Recipe } from '../../types'; 
import { Button } from '@mui/material';


interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  recipe: Recipe;
}

export default function CustomModal ({ open, onClose, children, recipe }: PropsWithChildren<CustomModalProps>) {
  return (
    <Modal className={styles.ModalContainer} open={open} onClose={onClose}>
      <Box className={styles.Modal}>
        {/* TODO: Carousel for multiple images */}
        <img className = {styles.FoodImage} src={recipe.image} alt='Picture of food' /> 
        
        <section className={styles.RecipeContentContainer}>
          <div className = {styles.NavbarContainer}>
            <IconButton onClick={onClose} className={styles.closeButton}>
              <CloseRounded />
            </IconButton>
          </div>
          <section className={styles.RecipeContent}>
            <header className={styles.RecipeTitle}>
              <a className={styles.RecipeLink} href={recipe.url} target="_blank"> 
                <h1 className={styles.RecipeTitleText}>{recipe.label}</h1>
              </a>
            </header>
            <Divider variant='middle' />
            <div className ={styles.IngredientsContainer}>
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
            <section className={styles.ReadMoreButtonContainer}>
              <Button className={styles.ReadMoreButton} variant='contained' href={recipe.url}>
                Read More
              </Button>
            </section>
          </section>
          {children}
        </section>
      </Box>
    </Modal>
  );
};
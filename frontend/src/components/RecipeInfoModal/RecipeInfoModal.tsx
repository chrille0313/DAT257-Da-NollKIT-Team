import { CloseRounded } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Modal } from '@mui/material';
import Fraction from 'fraction.js';
import { PropsWithChildren } from 'react';
import { Recipe } from '../../types';
import styles from './RecipeInfoModal.module.css';

interface RecipeInfoModalProps {
  open: boolean;
  onClose: () => void;
  recipe: Recipe;
}

function getFractionString(
  decimal: number,
  ignoreDecimals: number = 2
): string {
  const decimalMultiplier = Math.pow(10, ignoreDecimals);
  const rounded = Math.round(decimal * decimalMultiplier) / decimalMultiplier;

  if (decimal === rounded) {
    return decimal.toString();
  }

  return new Fraction(decimal).toFraction(false);
}

function getIngredientAmountString(ingredient: Recipe['ingredients'][0]) {
  const quantity = getFractionString(ingredient.quantity);

  if (quantity === '0') {
    return '';
  } else if (ingredient.measure === '<unit>') {
    return `${quantity}`;
  }

  return `${quantity} ${ingredient.measure}`;
}

export default function RecipeInfoModal({
  open,
  recipe,
  children,
  onClose
}: PropsWithChildren<RecipeInfoModalProps>) {
  return (
    <Modal className={styles.ModalContainer} open={open} onClose={onClose}>
      <Box className={styles.Modal}>
        {/* TODO: Carousel for multiple images */}
        <img className={styles.FoodImage} src={recipe.image} alt="Food" />

        <section className={styles.RecipeContentContainer}>
          <div className={styles.NavbarContainer}>
            <IconButton onClick={onClose} className={styles.CloseButton}>
              <CloseRounded />
            </IconButton>
          </div>
          <section className={styles.RecipeContent}>
            <header className={styles.RecipeTitle}>
              <a
                className={styles.RecipeLink}
                href={recipe.url}
                target="_blank"
                rel="noreferrer"
              >
                <h1 className={styles.RecipeTitleText}>{recipe.label}</h1>
              </a>
            </header>
            <Divider variant="middle" />
            <div className={styles.IngredientsContainer}>
              <h3 className={styles.RecipeSubtitle}>Ingredients</h3>
              <table className={styles.IngredientsTable}>
                {recipe.ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td>{ingredient.food}</td>
                    <td>{getIngredientAmountString(ingredient)}</td>
                  </tr>
                ))}
              </table>
            </div>
            <section className={styles.ReadMoreButtonContainer}>
              <Button
                className={styles.ReadMoreButton}
                variant="contained"
                href={recipe.url}
                target="_blank"
                rel="noreferrer"
              >
                Read More
              </Button>
            </section>
          </section>
          {children}
        </section>
      </Box>
    </Modal>
  );
}

import styles from './RecipeColumnSkeleton.module.css';
import {Stack, Skeleton, Typography, Box} from '@mui/material';

const RecipeColumnSkeleton = () => { 
  return (
    <Stack className={styles.Container}>
      <Skeleton className={styles.SkeletonImage} variant='rounded' />

      <Stack className={styles.TextContentContainer}>
        <Stack>
          <Typography className={styles.IconsContainer} variant='caption'>
            <Box className={styles.IconWithTextContainer}>
              <Skeleton variant='circular' width={16} height={16} />
              <Skeleton width={75} />
            </Box>
            <Box className={styles.IconWithTextContainer}>
              <Skeleton variant='rectangular' width={16} height={16} />
              <Skeleton width={75} />
            </Box>
          </Typography>

          <Typography variant='h3'>
            <Skeleton /> 
          </Typography>

          <Typography variant='body1'>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Typography>
        </Stack>

        <Box className={styles.CO2Container}>
          <Skeleton className={styles.CO2Bar} />
          <Skeleton width={50} />
        </Box>
      </Stack>
    </Stack>
  );
}


export default RecipeColumnSkeleton;
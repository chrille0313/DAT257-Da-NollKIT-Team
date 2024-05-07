import styles from './RecipeColumnSkeleton.module.css';
import {Stack, Skeleton, Typography} from '@mui/material';

const RecipeColumnSkeleton = () => { 
    return (
        <Stack className={styles.container}>
            <Skeleton className={styles.skeletonImage} variant="rounded" width={300} height={500} />
            <Typography className={styles.skeletonHeader} variant="h3"><Skeleton /> </Typography>  
            <Skeleton className={styles.skeletonText} variant="text" sx={{ fontSize: '2rem' }} />  
            <Skeleton className={styles.skeletonText} variant="text" sx={{ fontSize: '2rem' }} />  
            <Skeleton className={styles.skeletonText} variant="text" sx={{ fontSize: '2rem' }} />  
        </Stack>
    );
}


export default RecipeColumnSkeleton;
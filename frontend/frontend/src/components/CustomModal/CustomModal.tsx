// src/components/CustomModal.tsx
import React, { ReactNode } from 'react';
import { Modal, Box, Button } from '@mui/material';
import styles from './CustomModal.module.css';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode; // Declare the children prop
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, children }) => {
  return (
    <Modal className={styles.modalBackground} open={open} onClose={onClose}>
      <Box className={styles.infoContainer}>
        <Button onClick={onClose} className={styles.closeButton2}>
          Close
        </Button>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
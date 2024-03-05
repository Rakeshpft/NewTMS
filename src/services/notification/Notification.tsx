import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface NotificationProps {
  type: 'error' | 'info' | 'success' | 'warning';
  message: string | any
   closeAlert: () => void;
}

export const Notification = (props: NotificationProps) => {
  const { type, message , closeAlert } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      className="notification-snackbar"
      open={message !== ''}
      autoHideDuration={4000}
       onClose={closeAlert}
    >
      <Alert
        className={type === 'success' ? 'notification' : 'notification-error'}
        variant="outlined"
        severity={type}
         onClose={closeAlert}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

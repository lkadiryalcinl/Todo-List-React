import React from 'react';
import { Alert, Typography } from '@mui/material';
import './TodoAlert.css';

const TodoAlert = ({ Todo }) => {
  const currentDate = new Date();
  const dateStart = new Date(Todo.dateStart);
  const dateEnd = new Date(Todo.dateEnd);

  if (currentDate < dateStart) {
    const daysLeft = Math.round((dateStart.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    return (
      <Alert variant="filled" severity="success">
        <Typography variant="body2" color="inherit" textAlign="center" padding={1} borderRadius={20}>
          {daysLeft} Day Left To Start Todo
        </Typography>
      </Alert>
    );
  } else if (currentDate >= dateEnd) {
    return (
      <Alert variant="filled" severity="error">
        <Typography variant="body2" color="inherit" textAlign="center" padding={1} borderRadius={20}>
          Todo Must Finished Today - Hurry Up!
        </Typography>
      </Alert>
    );
  } else if (dateEnd < currentDate) {
    return (
      <Alert variant="filled" severity="error">
        <Typography variant="body2" color="inherit" textAlign="center" padding={1} borderRadius={20}>
          Todo Expired - Not Finished in Time!
        </Typography>
      </Alert>
    );
  } else {
    const daysRemained = Math.round((dateEnd.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    const endDateString = [
      dateEnd.getDate(),
      dateEnd.getMonth() + 1,
      dateEnd.getFullYear(),
    ].join('/');

    return (
      <Alert variant="filled" severity={daysRemained <= 1 ? "error" : daysRemained < 4 ? "warning" : "success"}>
        <Typography variant="body2" color="inherit" textAlign="center" padding={1} borderRadius={20}>
          {daysRemained} Day Remained - It will end {endDateString}
        </Typography>
      </Alert>
    );
  }
};

export default TodoAlert;

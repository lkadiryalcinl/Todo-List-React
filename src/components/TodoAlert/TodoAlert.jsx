import React from 'react';
import { Alert, Typography } from '@mui/material';
import './TodoAlert.css'

const TodoAlert = ({ Todo }) => {
  const currentDate = new Date();

  if (currentDate < new Date(Todo.dateStart)) {
    const daysLeft = Math.round((new Date(Todo.dateStart).getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    return (
      <Alert variant="filled" severity="success">
        <Typography variant="body2" color="inherit" textAlign="center" padding={1} borderRadius={20}>
          {daysLeft} Day Left To Start Todo
        </Typography>
      </Alert>
    );
  } else if (currentDate > new Date(Todo.dateEnd)) {
    return (
      <Alert variant="filled" severity="error">
        <Typography variant="body2" color="inherit" textAlign="center" padding={1} borderRadius={20}>
          Today Must Finished
        </Typography>
      </Alert>
    );
  } else {
    const daysRemained = Math.round((new Date(Todo.dateEnd).getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    const endDateString = [
      new Date(Todo.dateEnd).getDate(),
      new Date(Todo.dateEnd).getMonth() + 1,
      new Date(Todo.dateEnd).getFullYear(),
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

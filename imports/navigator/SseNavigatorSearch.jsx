import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

export default function PrimarySearchAppBar() {
  return (
    <div>
        <IconButton color="inherit" aria-label="Search">
        </IconButton>
        <Input
            placeholder="Tag Search…"
            inputProps={{ 'aria-label': 'search' }}
        />
    </div>
  );
}

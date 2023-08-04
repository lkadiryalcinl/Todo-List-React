import { Grid, Input } from '@mui/material';
import * as React from 'react'

import './Search.css'

const Search = ({value,setValue}) => {
    return(
        <Grid className='search-container'>
            <Input 
            className='search-input'
            value={value} 
            onChange={(event) => setValue(event.target.value)} 
            placeholder='Search...'
            />
        </Grid>
    )
}

export default Search;
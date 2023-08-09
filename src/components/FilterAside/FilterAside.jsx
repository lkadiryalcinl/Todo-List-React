import * as React from 'react'

import {
    Grid,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    IconButton,
} from '@mui/material'

import {
    GridViewOutlined,
    ViewHeadlineOutlined
} from '@mui/icons-material'

import './FilterAside.css'

const SortCard = ({ radioSortValue, setRadioSortValue }) => {

    const handleRadioSortValue = (event) => {
        if (setRadioSortValue)
            setRadioSortValue(event.target.value);
        console.log(radioSortValue);
    };

    return (
        <Grid
            className='filter-card-container'
            boxShadow={2}
        >
            <FormControl>
                <FormLabel
                    id="radio-buttons-group"
                    className='radio-text-title'
                >
                    Sort
                </FormLabel>
                <RadioGroup
                    name="controlled-radio-buttons-group"
                    value={radioSortValue}
                    onChange={handleRadioSortValue}
                >
                    <FormControlLabel
                        value="title"
                        control={<Radio
                            className='radio-button-color'
                        />}
                        label="Title"
                        className='radio-text'
                    />
                    <FormControlLabel
                        value="isFav"
                        control={<Radio
                            className='radio-button-color'
                        />}
                        label="Marked"
                        className='radio-text'

                    />
                    <FormControlLabel
                        value="priorityType"
                        control={<Radio
                            className='radio-button-color'
                        />}
                        label="Priority"
                        className='radio-text'

                    />
                    <FormControlLabel
                        value="dateCreated"
                        control={<Radio
                            className='radio-button-color'
                        />}
                        label="Created Date"
                        className='radio-text'

                    />
                </RadioGroup>
            </FormControl>
        </Grid>
    )
}

const OrderCard = ({ radioOrderValue, setRadioOrderValue }) => {

    const handleRadioOrderValue = (event) => {

        if (setRadioOrderValue){
            setRadioOrderValue(event.target.value);
        }

    };

    return (
        <Grid
            className='filter-card-container'
            boxShadow={2}
        >
            <FormControl>
                <FormLabel
                    id="radio-buttons-group"
                    className='radio-text-title'
                >
                    Order
                </FormLabel>
                <RadioGroup
                    name="controlled-radio-buttons-group"
                    value={radioOrderValue}
                    onChange={handleRadioOrderValue}
                >
                    <FormControlLabel
                        value={''}
                        control={<Radio
                            className='radio-button-color'
                        />}
                        label="Ascending"
                        className='radio-text'

                    />
                    <FormControlLabel
                        value={'true'}
                        control={<Radio
                            className='radio-button-color'
                        />}
                        label="Descending"
                        className='radio-text'

                    />
                </RadioGroup>
            </FormControl>
        </Grid>
    )
}


const FilterAside = ({ radioSortValue, setRadioSortValue, radioOrderValue, setRadioOrderValue, columnWidth, setColumnWidth }) => {
    return (
        <Grid className='todo-board-filter-container'>
            <Grid className='view-control-container'>
                <IconButton className={columnWidth === "40vw" ? 'column-control-color' : 'default'} onClick={() => {
                    setColumnWidth('40vw')
                }}>
                    <ViewHeadlineOutlined />
                </IconButton>
                <IconButton className={columnWidth === "30vw" ? 'column-control-color' : 'default'} onClick={() => {
                    setColumnWidth('30vw')
                }}>
                    <GridViewOutlined />
                </IconButton>
            </Grid>
            <SortCard radioSortValue={radioSortValue} setRadioSortValue={setRadioSortValue} />
            <OrderCard radioOrderValue={radioOrderValue} setRadioOrderValue={setRadioOrderValue} />
        </Grid>
    )
}

export default FilterAside;
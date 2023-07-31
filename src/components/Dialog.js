import * as React from 'react';
import { Formik } from 'formik';

import {
    Grid,
    IconButton,
    TextField,
    InputLabel,
    OutlinedInput,
    FormControl,
    Select,
    MenuItem,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    Dialog,
    Button,
} from '@mui/material';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import tr from "date-fns/locale/tr";
import { AddTodo, UpdateTodo } from '../utils/utils';
import { TodoValidation } from '../validation/validation';
registerLocale("tr", tr);

export default function TodoDialog({ dialog, changeDialog, dispatch, type, userId, data }) {

    const priorityTypeProps = {
        low: "Low",
        medium: "Medium",
        high: "High"
    }

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                open={dialog}
                onClose={changeDialog}
            >
                {!type ? <DialogTitle>Add Todo</DialogTitle> : <DialogTitle>Update Todo</DialogTitle>}
                <DialogContent>
                    {!type ? (<DialogContentText>
                        You can create todos...
                    </DialogContentText>) : <DialogContentText>
                        You can update todos...
                    </DialogContentText>}

                    <Grid>
                        <Formik
                            initialValues={{
                                title: !type ? "" : data?.title,
                                priorityType: !type ? "" : data?.priorityType,
                                desc: !type ? "" : data?.description,
                                date: {
                                    dateStart: null,
                                    dateEnd: null
                                },
                            }}
                            validationSchema={TodoValidation}
                            onSubmit={(values, { setSubmitting }) => {
                                !type ? AddTodo(dispatch, values, userId) : UpdateTodo(dispatch, values, userId);
                                changeDialog(false);
                                setSubmitting(false);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                setFieldValue,
                                /* and other goodies */
                            }) => (
                                <Grid style={{ display: 'flex', flexDirection: 'column' }} marginY={4} container>
                                    <TextField
                                        color={errors.title && values.title.length !== 0 ? "error" : ""}
                                        label={errors.title && values.title.length !== 0 ? errors.title : 'Title'}
                                        type="text"
                                        name="title" // Corrected name attribute
                                        onChange={handleChange} // Corrected handleChange
                                        onBlur={handleBlur}
                                        value={values.title}
                                    />
                                    {errors.title && touched.title && <div>{errors.title}</div>}

                                    <TextField
                                        color={errors.desc && values.desc.length !== 0 ? "error" : ""}
                                        label={errors.desc && values.desc.length !== 0 ? errors.desc : 'Description'}
                                        type="text"
                                        name="desc" // Corrected name attribute
                                        onChange={handleChange} // Corrected handleChange
                                        onBlur={handleBlur}
                                        value={values.desc}
                                        style={{ marginBottom: '1rem', marginTop: '1rem' }}
                                    />
                                    {errors.desc && touched.desc && <div>{errors.desc}</div>}
                                    <FormControl>

                                        <InputLabel id="demo-multiple-name-label">Priority Type</InputLabel>
                                        <Select
                                            name="priorityType"
                                            placeholder='Priority Type'
                                            defaultChecked
                                            labelId="demo-multiple-name-label"
                                            input={<OutlinedInput label="Priority Type" />}
                                            defaultValue={priorityTypeProps.low}
                                            value={values.priorityType}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={priorityTypeProps.low}>Low</MenuItem>
                                            <MenuItem value={priorityTypeProps.medium}>Medium</MenuItem>
                                            <MenuItem value={priorityTypeProps.high}>High</MenuItem>
                                        </Select>
                                    </FormControl>

                                    {errors.priorityType && touched.priorityType && <div>{errors.priorityType}</div>}

                                    <Grid style={{ alignItems: 'center', display: 'flex', marginTop: 8, flexDirection: 'column' }}>
                                        <DialogTitle>
                                            Pick date
                                        </DialogTitle>
                                        <DatePicker
                                            value={values.date.dateStart}
                                            autoComplete={false}
                                            name='date'
                                            onChange={(date) => {
                                                setFieldValue('date.dateStart', date[0])
                                                setFieldValue('date.dateEnd', date[1])
                                            }}
                                            startDate={values.date.dateStart}
                                            endDate={values.date.dateEnd}
                                            selectsRange
                                            isClearable
                                            popperPlacement="top-start"
                                            showTimeSelect
                                            minDate={new Date()}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            timeFormat="p"
                                            timeIntervals={60}
                                            locale={tr}
                                            allowSameDay
                                            calendarStartDay={1}
                                            inline
                                        />
                                    </Grid>
                                    <IconButton type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                                        Submit
                                    </IconButton>
                                </Grid>
                            )}
                        </Formik>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={changeDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  FormControlLabel ,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControl,
  Switch,
  Stack 
} from '@mui/material';
import './Editor.sass';
import Header from '../components/Header/Header';

interface EditProps {
  isEdit: boolean
}

const Edit = (props: EditProps) => {
  const types = [
    {
      value: 'books',
      label: 'Books'
    },
    {
      value: 'electronics',
      label: 'Electronics'
    },
    {
      value: 'food',
      label: 'Food'
    },
    {
      value: 'furniture',
      label: 'Furniture'
    },
    {
      value: 'toys',
      label: 'Toys'
    },
  ];

  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  }

return (
    <>
      <Header/>
      <div className="editor">
        <div className="editor__container">
          <Typography variant="h5">{props.isEdit ? "Edit Product" : "New Product"}</Typography>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <form>
              <FormControl fullWidth>
                <TextField
                  style={{ width: "200px", margin: "5px" }}
                  type="text"
                  label="Name"
                  multiline
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  style={{ width: "200px", margin: "5px" }}
                  type="text"
                  label="Price"
                  variant="outlined"
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="select name"
                  select
                  label="Types"
                >
                  {types.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>                
              </FormControl>
              <FormControlLabel control={<Switch defaultChecked />} label="Active" sx={{ml: 0, width: '100%'}}/>
              <FormControl>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="success">{props.isEdit ? "Save Product" : "Create Product"}</Button>
                  <Button variant="outlined" onClick={handleReturnHome}>Return</Button>
                </Stack>
              </FormControl>
            </form>
          </Box>
        </div>
      </div>
    </>
  )
};

export default Edit;
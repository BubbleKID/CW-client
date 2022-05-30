import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { default as NumberFormat } from 'react-number-format';
import {
  Typography,
  FormControlLabel ,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControl,
  Switch,
  Stack,
  InputLabel,
  Snackbar
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './Editor.sass';
import Header from '../../components/Header/Header';
import axios from 'axios';

interface EditProps {
  isEdit: boolean
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  type: string;
  active: boolean;
}

const NumberFormatCustom = React.forwardRef<NumberFormat<React.Component>, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        allowNegative={false}
        isNumericString
        decimalScale={2}
        prefix="$"
      />
    );
  },
);

const Edit = (props: EditProps) => {
  const BASE_URL = process.env.BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { product: Product };
  const typeOptions = [
    "Books",
    'Electronics',
    'Food',
    'Furniture',
    'Toys',
  ];
  const [productName, setProductName] = useState<string>(props.isEdit ? state.product.name : '');
  const [productPrice, setProductPrice] = useState<string | number>(props.isEdit ? state.product.price : ''); 
  const [productType, setProductType] = useState<string>(props.isEdit ? state.product.type : ''); 
  const [productActive, setProductActive] = useState<boolean>(props.isEdit ? state.product.active : false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setalertMessage] = useState<string>('No message');

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleCreate = () => {
    axios.post(`${BASE_URL}/api/save`, {
      name: productName,
      price: productPrice,
      type: productType,
      active: productActive
    })
    .then((response) => {
      console.log(response);
      setOpenAlert(true);
      setalertMessage(response.data);
    }, (error) => {
      console.log(error);
      setOpenAlert(true);
      setalertMessage(error)
    });
  };

  const handleSave = () => {
    axios.post(`${BASE_URL}/api/update`, {
      _id: state.product._id,
      name: productName,
      price: productPrice,
      type: productType,
      active: productActive
    })
    .then((response) => {
      console.log(response);
      setOpenAlert(true);
      setalertMessage(response.data);
    }, (error) => {
      console.log(error);
      setOpenAlert(true);
      setalertMessage(error)
    });
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <Header/>
      <div className="editor">
        <div className="editor__container">   
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <Typography variant="h5" sx={{ margin: "5px" }}>{props.isEdit ? "Edit Product" : "New Product"}</Typography>
            <FormControl fullWidth>
              <TextField
                style={{ width: "300px", margin: "5px" }}
                type="text"
                label="Name"
                value={productName}
                onChange={event => setProductName(event.target.value)}
                multiline
                inputProps={{ maxLength: 100 }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                style={{ width: "300px", margin: "5px" }}
                label="Price"
                variant="outlined"
                value={productPrice}
                onChange={event => setProductPrice(Number(event.target.value))}
                InputProps={{
                  inputComponent: NumberFormatCustom as any,
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="select-type-label" style={{ margin: "5px" }}>Types</InputLabel>
              <Select
                labelId="select-type-label"
                style={{ width: "300px", margin: "5px" }}
                id="select-type"
                label="Types"
                value={productType}
                onChange={event => setProductType(event.target.value)}
              >
                {typeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>                
            </FormControl>
            <FormControlLabel control={<Switch checked={productActive} onChange={event => setProductActive(event.target.checked)} />} label="Active" sx={{ml: 0, width: '100%'}}/>
            <FormControl>
              <Stack direction="row" spacing={2}  style={{ margin: "5px" }}>
                {props.isEdit ? <Button variant="contained" onClick={handleSave}>Save Product</Button>
                  : <Button variant="contained" onClick={handleCreate}>Create Product</Button>
                }   
                <Button variant="outlined" onClick={handleReturnHome}>Back To Home</Button>
              </Stack>
            </FormControl>
          </Box>
          <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleClose}
            message={alertMessage}
          />
        </div>
      </div>
    </>
  )
};

export default Edit;
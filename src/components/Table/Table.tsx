import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Paper,
  IconButton,
  TableSortLabel,
  Tooltip,
  Typography, 
  FormControlLabel,
  Button,
  Box,
  Switch,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material';

import {
  Delete as DeleteIcon,
  AddCircle as AddCircleIcon,
  Create as CreateIcon
  } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from "react-router-dom";
import './Table.sass';
import axios from 'axios';

interface Data {
  _id: string;
  name: string;
  price: number;
  type: string;
  active: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'active',
    numeric: false,
    disablePadding: false,
    label: 'Active',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface TableProps {
  products: Data[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
          <TableCell>
            Actions
          </TableCell>
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = () => {
  const navigate = useNavigate();

  const handleAddNewProduct = () => {
    navigate('/new-product');
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Products
      </Typography>       
      <Tooltip title="Add a new product">
        <Button variant="contained" endIcon={<AddCircleIcon/>} sx={{minWidth: '200px'}} onClick={handleAddNewProduct}>
          New product
        </Button>
      </Tooltip>
    </Toolbar>
  );
};

export default function EnhancedTable(props: TableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openAlert, setOpenAlert] =  React.useState<boolean>(false);
  const [alertMessage, setalertMessage] =  React.useState<string>('No message');
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [currentId, setCurrentId] = React.useState<string>('');

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.products.length) : 0;
  
  const navigate = useNavigate();

  const handleDelete = (productId: String) => {
    const BASE_URL = process.env.BASE_URL;
  
    axios.post(`${BASE_URL}/api/delete`, {_id: productId})
    .then((response) => {
      console.log(response);
      setOpenAlert(true);
      setalertMessage(response.data);
      setOpenDialog(false);
    }, (error) => {
      console.log(error);
      setOpenAlert(true);
      setalertMessage(error);
      setOpenDialog(false);
    });
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Box sx={{ width: '100%' }} className="table">
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.products.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(props.products, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      key={row._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell padding="checkbox">
                        
                      </TableCell>
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{`$${row.price.toFixed(2)}`}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{row.active ? "Active" : "Inactive"}</TableCell>
                      <TableCell align="left">
                        <IconButton color="error" aria-label="delete" onClick={() => {setOpenDialog(true);setCurrentId(row._id);}}>
                          <DeleteIcon  />
                        </IconButton>                         
                        <IconButton color="primary" aria-label="edit" onClick={() => navigate('/edit', { state: { product: row } })}>
                          <CreateIcon  />
                        </IconButton>                        
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        message={alertMessage}
      />
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this record?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Return</Button>
          <Button onClick={() => handleDelete(currentId)} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

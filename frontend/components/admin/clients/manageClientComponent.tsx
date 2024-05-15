'use client';
import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetter } from '@mui/x-data-grid';
import { Box, TextField } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useDispatch, useSelector } from 'react-redux';
import { getClientsDetailsAction, adminStateType } from '@/store/admin/adminReducer';
import { useRouter } from 'next/navigation';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Sl.No', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  {
    field: 'therapyType',
    headerName: 'Therapy for',
    width: 130,
  },
  {
    field: 'edit',
    headerName: 'Edit',
    sortable: false,
    width: 100,

  },
  {
    field: 'delete',
    headerName: 'Delete',
    sortable: false,
    width: 100,

  },
];

const initialRows = [
  { id: 1, name: 'Snow', email: 'Jon', therapyType: 35, edit: 'edit', delete: 'delete' },
  { id: 2, name: 'Lannister', email: 'Cersei', therapyType: 42, edit: 'edit', delete: 'delete' },
  { id: 3, name: 'Lannister', email: 'Jaime', therapyType: 45, edit: 'edit', delete: 'delete' },
  { id: 4, name: 'Stark', email: 'Arya', therapyType: 16, edit: 'edit', delete: 'delete' },
  { id: 5, name: 'Targaryen', email: 'Daenerys', therapyType: null, edit: 'edit', delete: 'delete' },
  { id: 6, name: 'Melisandre', email: null, therapyType: 150, edit: 'edit', delete: 'delete' },
  { id: 7, name: 'Clifford', email: 'Ferrara', therapyType: 44, edit: 'edit', delete: 'delete' },
  { id: 8, name: 'Frances', email: 'Rossini', therapyType: 36, edit: 'edit', delete: 'delete' },
  { id: 9, name: 'Roxie', email: 'Harvey', therapyType: 65, edit: 'edit', delete: 'delete' },
];

const AdminManageClients = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state: { admin: adminStateType }) => state.admin.clients);
  const router = useRouter()
  const [search, setSearch] = useState<string>('');
  const [rows, setRows] = useState(initialRows);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    const filteredRows = initialRows.filter(row =>
      Object.keys(row).some(field =>
        String(row[field as keyof typeof row])
          .toLowerCase()
          .includes(value)
      )
    );
    setRows(filteredRows);
  };

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      const fetchData = async () => {
        await dispatch(getClientsDetailsAction());
      };

      fetchData();
    } else {
      router.push('/admin/login')
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        ml: { sm: '15rem' }
      }}
    >
      <TextField
        label="Search..."
        variant="outlined"
        value={search}
        onChange={handleSearch}
        sx={{ marginBottom: 2, width: '90%' }}
      />
      <Box
        sx={{
          height: 400,
          width: '90%',
          maxWidth: '100%',
          border: '1px solid green',
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </Box>
  );
}
export default AdminManageClients
'use-client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllClientsDetailsAction, adminStateType } from "@/store/admin/adminReducer";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { deleteClient, editClient } from "@/utilities/admin/clients/manageClients";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";

const AdminManageClients = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state: { admin: adminStateType }) => state.admin.clients);
  const router = useRouter()
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      dispatch(getAllClientsDetailsAction());
    } else {
      router.push('/admin/login')
    }
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
  };

  const handleDelete = (cliendId: string, clientName: string) => {
    deleteClient(cliendId, clientName);
  };

  const handleEdit = (cliendId: string, clientName: string) => {
    editClient(cliendId, clientName);
  };

  const columns: GridColDef[] = [
    { field: "slNo", headerName: "Sl.No", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "therapyType", headerName: "Therapy For", width: 150 },
    { field: "clientStatus", headerName: "ClientStatus", width: 130 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          disabled={!params.row.isBlocked}
          onClick={() => handleEdit(params.row.id, params.row.name)}
        >
          <EditIcon />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          disabled={params.row.isBlocked}
          onClick={() => handleDelete(params.row.id, params.row.name)}
        >
          <PersonOffIcon />
        </Button>
      ),
    },
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search) ||
    client.email.toLowerCase().includes(search) ||
    client.type?.toLowerCase().includes(search) ||
    (client.isBlocked ? 'Blocked' : 'Active').toLowerCase().includes(search)
  );

  const rows = filteredClients.map((client, index) => ({
    id: client._id,
    slNo: index + 1,
    name: client.name,
    email: client.email,
    therapyType: client.sessionType,
    clientStatus: client.isBlocked ? 'Blocked' : 'Active',
    isBlocked: client.isBlocked,
  }));

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
       <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '63rem', maxWidth: '90%',
            }}>
                <Typography variant="h6" noWrap component="div" sx={{
                    color: '#325343',
                    fontWeight: 800
                }}>
                    Manage Clients
                </Typography>
                <TextField
                    label="Search..."
                    variant="outlined"
                    value={search}
                    onChange={handleSearch}
                    sx={{ marginBottom: 2, }}
                />
            </Box>
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
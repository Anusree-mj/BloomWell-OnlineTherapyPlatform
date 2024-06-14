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
import TableComponent from "@/components/common/tableComponent";

const AdminManageClients = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state: { admin: adminStateType }) => state.admin.clients);
  const router = useRouter()

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      dispatch(getAllClientsDetailsAction());
    } else {
      router.push('/admin/login')
    }
  }, []);
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
  const rows = clients.map((client, index) => ({
    id: client._id,
    slNo: index + 1,
    name: client.name,
    email: client.email,
    therapyType: client.sessionType,
    clientStatus: client.isBlocked ? 'Blocked' : 'Active',
    isBlocked: client.isBlocked,
  }));
  const head = 'Manage Clients ';

  return (
    <Box sx={{
      ml: { xs: 'none', sm: '15rem' }
    }}>
      <TableComponent rows={rows} columns={columns} head={head} subHead={[]} />
    </Box>
  );
}
export default AdminManageClients
import { Typography, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

interface SubHeadItem {
    name: string;
    url: string;
    select: boolean;
}

interface TableComponentProps {
    rows: GridRowsProp;
    columns: GridColDef[];
    head: string;
    subHead?: SubHeadItem[];
    role: string
}

const TableComponent: React.FC<TableComponentProps> = ({ rows, columns, head, subHead, role }) => {
    const router = useRouter()
    const [search, setSearch] = useState<string>('');
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
    };
    const filteredRows = rows.filter(row => {
        return Object.values(row).some(value =>
            String(value).toLowerCase().includes(search)
        );
    });

    const handleSubheadOnClick = (url: string) => {
        router.push(`/${url}`)
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{
                width: '90rem', maxWidth: '95%'
            }}>
                <Typography variant="h6" noWrap component="div" sx={{
                    color: role === 'admin' ? '#325343' : 'white', alignSelf: 'start', mt: 5,
                    fontWeight: 800
                }}>
                    {head}
                </Typography>

                <Box sx={{
                    display: 'flex', flexWrap: 'wrap',
                    alignItems: 'center', justifyContent: 'space-between',
                    mb: 1, width: '100%',
                }}>
                    <Box sx={{ display: 'flex', }}>
                        {subHead && subHead.map((item) => (
                            <>
                                {role === 'admin' && item.url === '#' ? (
                                    <Typography component="div" sx={{
                                        color: 'green', mb: 1, fontWeight: 700,
                                        fontSize: '1rem', backgroundColor: '#e0f7fa',
                                        p: 1, borderRadius: 1, alignSelf: 'center', mr: 2,
                                    }}>
                                        {item.name}
                                    </Typography>
                                ) : (

                                    <Typography noWrap component="div" sx={{
                                        color: role === 'admin' ? '#325343' : 'white', mb: 1, textDecoration: 'underline',
                                        fontWeight: item.select ? 600 : 400, fontSize: '0.9rem',
                                        backgroundColor: item.select ? '#16171638' : 'none', p: 1,
                                        alignSelf: 'flex-start', cursor: 'pointer', letterSpacing: 1
                                    }} onClick={() => { handleSubheadOnClick(item.url) }} >
                                        {item.name}
                                    </Typography>
                                )}
                            </>
                        ))}
                    </Box>
                    <TextField
                        label="Search..."
                        variant="outlined"
                        value={search}
                        sx={{
                            ml: 1,
                            alignSelf: 'end',
                            width: '15rem',
                            maxWidth: '90%',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: role === 'admin' ? '#325343' : 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: role === 'admin' ? '#325343' : 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: role === 'admin' ? '#325343' : 'white',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: role === 'admin' ? '#325343' : 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: role === 'admin' ? '#325343' : 'white',
                            },
                        }}
                        onChange={handleSearch}
                    />
                </Box>
                <Box
                    sx={{
                        height: 400,
                        width: '100%',
                        border: '1px solid green',
                    }}
                >
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        sx={{
                            '& .MuiDataGrid-cell': {
                                fontSize: '0.88rem',
                                color: role === 'admin' ? 'black' : 'white',
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>

    )
}

export default TableComponent
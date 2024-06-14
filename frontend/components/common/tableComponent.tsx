import { Typography, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

interface SubHeadItem {
    name: string;
    url: string;
    select: boolean
}

interface TableComponentProps {
    rows: GridRowsProp;
    columns: GridColDef[];
    head: string;
    subHead?: SubHeadItem[]
}

const TableComponent: React.FC<TableComponentProps> = ({ rows, columns, head, subHead }) => {
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
                height: '100vh',
            }}
        >
            <Box sx={{
                width: '90rem', maxWidth: '90%'
            }}>
                <Typography variant="h6" noWrap component="div" sx={{
                    color: '#325343', alignSelf: 'start',
                    fontWeight: 800
                }}>
                    {head}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between',
                    mb: 1,
                }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {subHead && subHead.map((item) => (
                            <Typography noWrap component="div" sx={{
                                color: '#325343', mb: 1, textDecoration: 'underline',
                                fontWeight: item.select ? 800 : 600, fontSize: '1rem',
                                alignSelf: 'flex-start', cursor: 'pointer', letterSpacing: 1
                            }} onClick={() => { handleSubheadOnClick(item.url) }} >
                                {item.name}
                            </Typography>
                        ))}
                    </Box>
                    <TextField
                        label="Search..."
                        variant="outlined"
                        value={search} sx={{
                            alignSelf: 'end', width: '20rem',
                            mt: { xs: 2 }
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
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>

    )
}

export default TableComponent
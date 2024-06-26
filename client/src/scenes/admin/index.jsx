import React from 'react'
import { useGetAdminsQuery } from 'state/api'
import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import { DataGrid } from '@mui/x-data-grid'
import DataGridCustomColumnMenu from 'components/DataGridCustomColumnMenu'

const Admin = () => {
    const theme = useTheme()
    const { data, isLoading } = useGetAdminsQuery()
    const columns = [
        { field: '_id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 0.5 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
            }
        },
        { field: 'country', headerName: 'Country', flex: 0.4 },
        { field: 'occupation', headerName: 'Occupation', flex: 1 },
        { field: 'role', headerName: 'Role', flex: 0.5 },
    ]
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Admins" subtitle={"View all admins and their information."} />
            <Box mt="40px" height="75vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: "none",
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: "none"
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none"
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: theme.palette.primary.light,
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none"
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButtoon-text': {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                    '*::-webkit-scrollbar': {
                        width: '0.4em'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.secondary[300],
                    }
                }
                } >
                <DataGrid
                    rows={data || []}
                    columns={columns}
                    loading={isLoading || !data}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    getRowId={(row) => row._id}
                    components={{
                        ColumnMenu: DataGridCustomColumnMenu,
                    }}
                />
            </Box>
        </Box >
    )
}

export default Admin
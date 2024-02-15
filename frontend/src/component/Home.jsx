import React, { useEffect, useState } from 'react'
import AxiosInstance from './Axios'
import { useMemo } from 'react';
import {MaterialReactTable} from 'material-react-table';
import Dayjs from 'dayjs'
import {Box, IconButton} from '@mui/material'
import {Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material'
import {Link} from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState()
  const [projectManager, setProjectManager] = useState()
  const [loading, setLoading] = useState(true)


  const GetData = async() => {
    try {
      const [projectResponse, projectManagerResponse] = await Promise.all([
        AxiosInstance.get(`project/`),
        AxiosInstance.get(`projectmanager/`)
      ]);
  
      setData(projectResponse.data);
      setProjectManager(projectManagerResponse.data);
      console.log(projectManagerResponse.data)
  
  
      setLoading(false);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    GetData();
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', 
        header: 'Name',
        size: 150,
      },
      {
        accessorKey:'projectmanager', 
        header: 'Project Manager',
        size: 150,
        Cell: ({ row }) => {
          const projectManagerInfo = projectManager && projectManager.find(q => q.id === row.original.projectmanager);
          return projectManagerInfo ? projectManagerInfo.name : 'N/A';
        },
      },
      {
        accessorFn: (row) => Dayjs(row.startDate).format('DD-MM-YYYY'),
        header: 'start_date',
        size: 150,
      },
      {
        accessorFn: (row) => Dayjs(row.endDate).format('DD-MM-YYYY'),
        header: 'end_date',
        size: 200,
      },
      {
        accessorFn: (item) => item.comments != null ? item.comments : '-',
        header: 'Comments',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
      },
    ],
    [projectManager],
  );
  return(
  <div>
    { loading ? <p>Loading ...</p> : 
    <MaterialReactTable
    columns={columns}
    data={data}
    enableRowActions
    renderRowActions={({row}) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
          <EditIcon />
        </IconButton> 

        <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
          <DeleteIcon />
        </IconButton>
      </Box>
    )}
    /> }
  </div>
  )
}

export default Home
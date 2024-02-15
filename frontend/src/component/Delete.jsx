import React, { useEffect, useState} from 'react'
import {Box, Button, Typography} from '@mui/material'
import AxiosInstance from './Axios'
import {useNavigate, useParams} from 'react-router-dom'

const Delete = () => {
  const myParam = useParams();
  const myId = myParam.id
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  const GetData = () => {
    AxiosInstance.get(`project/${myId}`).then((res) => {
      setData(res.data)
      setLoading(false)
    })
  }
  useEffect(() => {
    GetData();
  }, [])
  const navigate = useNavigate();
  
  const submission = (data) => { 
    AxiosInstance.delete(`project/${myId}/`)
    .then((res) => {
        navigate(`/`)
    })
  }

  return (
    <div>
          {loading ? <p>Loading</p> : 
          <div>
            <Box sx={{display: 'flex', width:'100%', backgroundColor: '#00003f', marginBottom: '10px'}}>
              <Typography sx={{marginLeft: '20px', color: '#fff'}}>
                Delete project : {data.name}
              </Typography>
            </Box>
            <Box sx={{display: 'flex', width:'100%', boxShadow: 3, padding: 4, flexDirection:'column'}}>
              <Box sx={{display: 'flex', justifyContent:'start', marginBottom:'40px'}}>
                Are you sure you want to delete project: {data.name}
              </Box>
              
              <Box sx={{width: '30%'}}>
                <Button variant='contained' onClick={submission} sx={{width: '100px'}}>
                  Delete
                </Button>
              </Box>
            </Box>
          </div>
          }
    </div>
  )
}

export default Delete 
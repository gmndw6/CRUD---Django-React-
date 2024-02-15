import React, { useEffect, useState } from 'react'
import {Box, Button, Typography} from '@mui/material'
import Datepickerfield from './forms/DatepickerField'
import Selectfield from './forms/Selectfield'
import Multilinefield from './forms/Multilinefield'
import Textfield from './forms/Textfield'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const Create = () => {
  const [projectManager, setProjectManager] = useState()
  const [loading, setLoading] = useState(true)

  const hardcodedOptions = [
    {id: '', name:'None'},
    {id: 'Open', name:'Open'},
    {id: 'In progress', name:'In progress'},
    {id: 'Completed', name:'Completed'},
  ]


  const GetData = () => {
    AxiosInstance.get(`projectmanager/`).then((res) => {
      setProjectManager(res.data)
      console.log(res.data)
      setLoading(false)
    })
  }
  useEffect(() => {
    GetData();
  }, [])

  const navigate = useNavigate();
  const defaultValues = {
    name : '',
    comments: '',
    status: ''
  }

  const schema = yup
  .object({
    name: yup.string().required('Name is a required field.'),
    projectmanager: yup.string().required('Project manager is a required field.'),
    status: yup.string().required('Status is a required status.'),
    comments: yup.string(),
    startDate: yup.date().required('Start date is a required field.'),
    endDate : yup.date().required('End date is a required field.')
              .min(yup.ref('startDate'), 'The end date cannot be before the start date.')
  })
  .required()

  const {handleSubmit, reset, setValue, control} = useForm({defaultValues:defaultValues, resolver: yupResolver(schema)}) 
  const submission = (data) => { 
    const StartDate = Dayjs(data.startDate["$d"]).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.endDate["$d"]).format("YYYY-MM-DD")
    AxiosInstance.post(`project/`,{
      name: data.name,
      projectmanager: data.projectmanager,
      status: data.status,
      comments: data.comments,
      startDate: StartDate,
      endDate : EndDate
    })
    .then((res) => {
        navigate(`/`)
    })
  }

  return (
    <div>
      { loading ? <p>Loading data...</p> : 
      <form onSubmit={handleSubmit(submission)}>
          <Box sx={{display: 'flex', width:'100%', backgroundColor: '#00003f', marginBottom: '10px'}}>
            <Typography sx={{marginLeft: '20px', color: '#fff'}}>
              Create records
            </Typography>
          </Box>
          <Box sx={{display: 'flex', width:'100%', boxShadow: 3, padding: 4, flexDirection:'column'}}>
            <Box sx={{display: 'flex', justifyContent:'space-around', marginBottom:'40px'}}>
              <Textfield
              label="Name"
              name="name"
              // {...register("name")}
              control={control}
              placeholder="Provide a project name"
              width={'30%'}
              />

              <Datepickerfield
              label="Start Date"
              name="startDate"
              // {...register("startDate")}
              control={control}
              width={'30%'}
              />

              <Datepickerfield
              label="End Date"
              name="endDate"
              // {...register("endDate")}
              control={control}
              width={'30%'}
              />
            </Box>


            <Box sx={{display: 'flex', justifyContent:'space-around'}}>
              <Multilinefield
              label="Comments"
              name="comments"
              // {...register("comments")}
              control={control}
              placeholder="Provide project comments"
              width={'30%'}
              />
              
              <Selectfield
              label="Status"
              name="status"
              // {...register("status")}
              options={hardcodedOptions}
              control={control}
              width={'30%'}
              />

              {/* <Box sx={{width: '30%'}}> */}
                <Selectfield
                label="Project Manager"
                name="projectmanager"
                // {...register("status")}
                options={projectManager}
                control={control}
                width={'30%'}
              />
              {/* </Box> */}
            </Box>
            <Box sx={{display: 'flex', justifyContent:'start', marginTop: '40px'}}>
                <Button variant='contained' type='submit' sx={{width: '30%'}}>
                  Submit
                </Button>
            </Box>
          </Box>
      </form>
      }
    </div>
  )
}

export default Create
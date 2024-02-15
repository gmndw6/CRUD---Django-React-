import React, { useEffect, useState} from 'react'
import {Box, Button, Typography} from '@mui/material'
import Datepickerfield from './forms/DatepickerField'
import Selectfield from './forms/Selectfield'
import Multilinefield from './forms/Multilinefield'
import Textfield from './forms/Textfield'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate, useParams} from 'react-router-dom'

const Edit = () => {
  const [projectManager, setProjectManagerList] = useState();
  const [loading,setLoading] = useState(true)
  const myParam = useParams();
  const myId = myParam.id

  const hardcodedOptions = [
    {id: "", name:"None"},
    {id: "Open", name:"Open"},
    {id: "In progress", name:"In progress"},
    {id: "Completed", name:"Completed"},
  ] 
  const GetData = async() => {
    try{
      const [editResponse, projectManagerList] = await Promise.all([
        AxiosInstance.get(`project/${myId}`),
        AxiosInstance.get(`projectmanager/`)
      ]);
      setProjectManagerList(projectManagerList.data)

      setValue('name', editResponse.data.name)
      const projManager = projectManagerList.data.find(option => option.id === editResponse.data.projectmanager);
      console.log(projManager)
      setValue('projectmanager', projManager ? projManager.id : '');
      
      const selectedStatus = hardcodedOptions.find(option => option.name.toLowerCase() === editResponse.data.status.toLowerCase());
      setValue('status', selectedStatus ? selectedStatus.id : '');
      
      setValue('comments', editResponse.data.comments)
      setValue('startDate', Dayjs(editResponse.data.startDate))
      setValue('endDate', Dayjs(editResponse.data.endDate))
      setLoading(false);
    }catch(error){
      console.log("Error fetching data:", error);
      setLoading(false);
    }
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
  
  const {handleSubmit, reset, setValue, control} = useForm({defaultValues:defaultValues}) 
  const submission = (data) => { 
    const StartDate = Dayjs(data.startDate["$d"]).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.endDate["$d"]).format("YYYY-MM-DD")

    AxiosInstance.put(`project/${myId}/`,{
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
              control={control}
              placeholder="Provide a project name"
              width={'30%'}
              />

              <Datepickerfield
              label="Start Date"
              name="startDate"
              control={control}
              width={'30%'}
              />

              <Datepickerfield
              label="End Date"
              name="endDate"
              control={control}
              width={'30%'}
              />
            </Box>


            <Box sx={{display: 'flex', justifyContent:'space-around'}}>
              <Multilinefield
              label="Comments"
              name="comments"
              control={control}
              placeholder="Provide project comments"
              width={'30%'}
              />
              
              <Selectfield
              label="Status"
              name="status"
              options={hardcodedOptions} 
              control={control}
              width={'30%'}
              />

                <Selectfield
                label="Project Manager"
                name="projectmanager"
                options={projectManager} 
                control={control}
                width={'30%'}
              />

              <Box sx={{display: 'flex', justifyContent:'start', marginTop: '40px'}}>
                <Button variant='contained' type='submit' sx={{width: '30%'}}>
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
      </form>
    }
    </div>
  )
}

export default Edit
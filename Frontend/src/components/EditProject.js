import { FormControl, FormGroup, InputLabel,Input, Button } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import { EditProject,GetAllProjects} from './service/api'
import { useHistory,useParams } from 'react-router-dom'
// import { makeStyles } from '@mui/material'

// const useStyle=makeStyles({
//   inputElement:{
//     width:"50vw"
//   }
// })

 const initialValues={

    name:'',
    email:'',
    address:''

}

const editProject= () => {
  return (
    <div>
      <h1>Edit Project</h1>
    </div>
)
}

export default editProject

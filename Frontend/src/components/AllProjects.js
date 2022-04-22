import {
  // Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  // TableFooter
} from '@mui/material'
import Modal from '@mui/material/Modal'
import { AppBar, Toolbar, makeStyles, Typography } from '@material-ui/core'
// import BasicModal from './modalUser'

import { GetAllProjects, DeleteProject } from './service/api'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

//use this command to install appropriate dependency => npm install @material-ui/core --save

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  tableContainer: {
    margin: '20px auto',
    // borderRadius: 20,
   
  },
  tableHead: {
    fontWeight: 800,
    fontSize: 18,
    // backgroundColor: "#C05D69",
    backgroundImage: 'linear-gradient(to bottom, #C05D69, #E0E0E0)',
  },
  tableRow: {
    '&:nth-child(even)': {
      backgroundColor: '#E0E0E0',
    },
  },
  tableData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Paper: {
    height: '80vh',
    marginTop: '80px',
    padding: '30px',
  },
  head: {
    backgroundColor: '#000',
  },
  tab: {
    color: '#fff'
  },
  navbar: {
    position: 'static',
    backgroundColor: '#000',
    marginBottom: '30px',
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    marginLeft: 'auto',
   
  },
})
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function AllProjects() {
  const [project, setproject] = useState([])

  const classes = useStyles()
  // const [openmodal,setopenmodal]=useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [search, setSearch] = useState('')

  // modal //
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    GetProjects()
  }, [])

  const DeleteProjectV1 = async (_id) => {
    await DeleteProject(_id)
    GetProjects()
    handleClose(true)
    console.log(_id)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }
  const GetProjects = async (search) => {
    try {
      const res = await GetAllProjects(search)
      setproject(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleKeydown = (event) => {
    if (event.key === 'Enter') {
      GetProjects(search)
    }
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - project.length) : 0

  return (
    <>
      <AppBar className={classes.navbar}>
        <Toolbar>
          <Typography>MY PROJECT</Typography>

          <NavLink className={classes.link}  to="/addproject">
            <button style={{width:"100px",height:"40px",fontSize:"16px"}}>Add User</button>
          </NavLink>
        </Toolbar>
      </AppBar>

      <Paper className={classes.Paper}>
        <Box style={{ marginRight: 'auto' }}>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            style={{ color: 'white' }}
            label="search"
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeydown}
          />
        </Box>
        <TableContainer
          component={Paper}
          className={classes.tableContainer}
          sx={{ maxHeight: 500 }}
        >
          <Table className={classes.table} size="small" stickyHeader>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={classes.heading}>Project Name</TableCell>
                <TableCell className={classes.heading}>
                  Project Description
                </TableCell>
                <TableCell className={classes.heading}>Skill Set</TableCell>
                <TableCell className={classes.heading}>No Of Members</TableCell>
                <TableCell className={classes.heading}>Is Active?</TableCell>
                <TableCell className={classes.heading}>Created Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {project
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project, _id) => {
                  return (
                    <TableRow>
                      {/* <TableCell className={classes.tableData}>hello</TableCell> */}
                      <TableCell>{project.projectName}</TableCell>
                      <TableCell>{project.description}</TableCell>
                      <TableCell>{project.skillset}</TableCell>
                      <TableCell>{project.NoOfMembers}</TableCell>
                      <TableCell>{project.isActive ? 'yes' : 'no'}</TableCell>
                      <TableCell>{project.createdDate}</TableCell>

                      <TableCell>
                        <div style={{ display: 'flex' }}>
                          <Button
                            color="primary"
                            variant="contained"
                            style={{
                              marginRight: 10,
                            }}
                            component={Link}
                            to={`/editproject/${project._id}`}
                          >
                            Edit
                          </Button>
                          <br />
                          {/* <Button color="secondary" variant="contained" onClick={()=>Deleteproject(project.id) } >Delete</Button> */}
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleOpen}
                          >
                            Delete
                          </Button>
                        </div>

                        <div>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                Are You Sure Remove Project
                              </Typography>
                              <button
                                color="primary"
                                value={project.id}
                                onClick={() => DeleteProjectV1(project._id)}
                              >
                                confirm
                              </button>
                            </Box>
                          </Modal>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={project.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </>
  )
}

export default AllProjects

import axios from 'axios'

const url = 'http://localhost:5000/project'

export const GetAllProjects = async (search) => {
  search = search || ''
  return await axios.get(`${url}?search=${search}`)
}

export const DeleteProject = async (id) => {
  return await axios.delete(`${url}/${id}`)
}

export const addProject = async (project) => {
  return await axios.post(`${url}`, project)
}

export const EditProject = async (id, user) => {
  return await axios.patch(`${url}/${id}`, user)
}

export const GetProjectById = async (id) => {
  return await axios.get(`${url}/${id}`)
}

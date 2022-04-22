const express = require('express');
const mongoose = require('mongoose');
const projectSchema = require('./model');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://srikanthkodari:srikanth157@cluster0-shard-00-00.bmsb7.mongodb.net:27017,cluster0-shard-00-01.bmsb7.mongodb.net:27017,cluster0-shard-00-02.bmsb7.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zexhor-shard-0&authSource=admin&retryWrites=true&w=majority').then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log('Connection failed',err);
});
app.post('/project',  (req, res) => {
  const project = new projectSchema({
    projectName: req.body.projectName,
    description: req.body.description,
    skillset: req.body.skillset,
    NoOfMembers: req.body.NoOfMembers,
    isActive: req.body.isActive,
    createdDate: req.body.createdDate
  });

  project.save().then((doc) => {
    res.send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get('/project/', async (req, res) => {
  try {
    const project = req.query.search != undefined ?  await projectSchema.find(
      {
        "$or":
          [
            {  "projectName":{$regex:req.query.search}},
            { "description":{$regex:req.query.search}}
          ]
        }
    ) :
    await projectSchema.find()
    res.send(project);
  }
  catch (err) {
    res.status(500).send(err);
  }
});


app.get('/project/:id', async (req, res) => {
  try {
    const project = await projectSchema.findById(req.params.id);
    res.send(project);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.patch('/project/:id', async (req, res) => {
  try {
    const project = await projectSchema.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(project);
  }
  catch (err) {
    res.status(500).send(err);
  }
});


app.delete('/project/:id', async (req, res) => {
  try {
    const project = await projectSchema.findByIdAndDelete(req.params.id);
    res.send(project);
  }
  catch (err) {
    res.status(500).send(err);
  }
});
app.listen(5000, () => {    
  console.log('Example app listening on port 5000!');
});
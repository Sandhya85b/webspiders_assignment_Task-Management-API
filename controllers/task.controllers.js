const express=require("express")
const taskModel = require("../models/task.model")
//a....... `POST /tasks`
exports.postTask=async(req,res)=>{
    try{
   const {title,description,status="TODO",priority,dueDate}=req.body
   if(!title || !status || !priority){
    res.status(400).json({msg:"Required is missing"})
   }
   const createTask=await taskModel.create({title,description,status,priority})
   res.status(201).json({msg:"Successfully created task"})
    }catch{
      res.status(500).json({msg:"Internal server error"})
    }
}
// b....... `GET /tasks`
exports.getTask=async(req,res)=>{
    try{
        const {status,priority,sort,limit=10,skip=0}=req.query
        let filter={};
        if(status){
            filter.status=status
        }
        if(priority){
            filter.priority=priority
        }
        let sorting={}
        if(sort==="createdAt_asc"){
            sorting.createdAt=1
        }
        if(sort==="createdAt_desc"){
            sorting.createdAt=-1
        }
        if(sort==="dueDate_asc"){
            sorting.dueDate=1
        }
        if(sort==="dueDate_desc"){
            sorting.dueDate=-1
        }

        const getTasks=await taskModel.find(filter)
        .sort(sorting)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        return res.status(200).json(getTasks)
    }
    catch(err){
        res.status(500).json({msg:"Internal server error"})
    }
}

//c....... `GET /tasks/:id`
exports.getTasksById=async(req,res)=>{
    try{
    const getTasks=await taskModel.findById(req.params.id)
    if(!getTasks){
        res.status(404).json({msg:"TaskId not Found"})
    }
    res.status(200).json(getTasks)
    }catch(err){
        res.status(500).json({msg:"Internal server error"})
    }
}

// d........... `PUT /tasks/:id`
exports.updateTasksById=async(req,res)=>{
    try{
    const updateTask=await taskModel.findByIdAndUpdate(req.params.id)
    if(!updateTask){
        res.status(404).json({msg:"TaskId not Found"})
    }
    res.status(200).json(updateTask)
    }catch(err){
        res.status(500).json({msg:"Internal server error"})
    }
}

// e........... `DELETE /tasks/:id`
exports.deleteTasksById=async(req,res)=>{
    try{
    const deleteTask=await taskModel.findByIdAndDelete(req.params.id)
    if(!deleteTask){
        res.status(404).json({msg:"TaskId not Found"})
    }
    res.status(200).json(deleteTask)
    }catch(err){
        res.status(500).json({msg:"Internal server error"})
    }
}
const express=require("express")
const taskController=require("../controllers/task.controllers")
const taskRoute=express.Router()

taskRoute.post("/",taskController.postTask)
taskRoute.get("/",taskController.getTask)
taskRoute.get("/:id",taskController.getTasksById)
taskRoute.put("/:id",taskController.updateTasksById)
taskRoute.delete("/:id",taskController.deleteTasksById)

module.exports=taskRoute
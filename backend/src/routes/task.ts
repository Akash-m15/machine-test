import { Request, Response, Router } from "express";
import { parse } from "csv-parse/sync";
import { AgentModel, TaskModel } from "../models/model";
import { TaskSchema, TaskUpdateSchema } from "../utils/zod_Validation";


const router = Router();


router.post("/upload", async (req: Request, res : Response) => {
  try {
    console.log(req.body)
    const rawCSV = req.body; 

    const records = parse(rawCSV, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
console.log("Records",records)
    const validTasks: any[] = [];
    const errorRecords: { row: any; error: string }[] = [];

    for (const row of records) {
      const parsedData = TaskSchema.safeParse(row);

      if (parsedData.success) {
        validTasks.push(parsedData.data);
      } else {
        errorRecords.push({
          row,
          error: JSON.stringify(parsedData.error)
        });
      }
    }


    const agents = await AgentModel.find();
    if (agents.length == 0) return res.status(400).json({ message: "No agents found" });


    const distributedTasks: any[] = [];

    const totalAgents = agents.length;
    const tasksPerAgent = Math.floor(validTasks.length / totalAgents);
    let remainder = validTasks.length % totalAgents;

    let startIndex = 0;

    for (const agent of agents) {
      const extra = remainder > 0 ? 1 : 0;
      const endIndex = startIndex + tasksPerAgent + extra;

      const tasksForAgent = validTasks.slice(startIndex, endIndex).map(task => ({
        ...task,
        agentId: agent._id,
      }));

      distributedTasks.push(...tasksForAgent);

      startIndex = endIndex;
      remainder--;
    }


    const createdTasks = await TaskModel.insertMany(distributedTasks);

    res.status(201).json({
      message: `${createdTasks.length} tasks uploaded and distributed successfully`,
      invalidRecords: errorRecords,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing CSV" });
  }
});

router.get("/agent/:agentId", async (req, res) => {
  const { agentId } = req.params;
  try {
    const tasks = await TaskModel.find({ agentId });
    res.json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tasks for agent" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await TaskModel.find().populate("agentId", "name email phone");
    res.json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const parsedData = TaskUpdateSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({ error: parsedData.error });
  }

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(id,{$set : parsedData.data}, { new: true });
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task updated", task: updatedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
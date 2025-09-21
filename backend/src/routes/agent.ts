import { Router } from "express";
import { AgentSchema, AgentUpdateSchema } from "../utils/zod_Validation";
import { hashPassword } from "../utils/auth";
import { AgentModel } from "../models/model";


const router = Router();

router.post('/create', async (req, res) => {

  const parsedData = AgentSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({ error: parsedData.error });
  }

  const { name, email, password, phone } = parsedData.data;

  const hashedPassword = await hashPassword(password);
  try {
    const existing = await AgentModel.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(400).json({ message: "Agent with email or phone already exists" });
    }

    const agent = await AgentModel.create({
      name,
      email,
      password: hashedPassword,
      phone
    })

    res.status(201).json({
      message: "Agent created successfully",
      agentId: agent._id
    })

  } catch (err) {
    console.log(err)
  }
})



router.get('/', async (req, res) => {
  try {

    const agents = await AgentModel.find();
    res.json({ agents })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Error in finding Agents"
    })
  }
})


router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {

    const agent = await AgentModel.findOne({
      _id: id
    });

    if (!agent) {
      return res.status(404).json({
        message: "No agent Found"
      })
    }

    res.json({ agent })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error while finding Agent"
    })
  }
})



router.put('/:id', async (req, res) => {

  const parsedData = AgentUpdateSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ error: parsedData.error });
  }

  const { name, email, phone, password } = parsedData.data;

  try {
    let hashedPassword;
    if (password) {
      hashedPassword = await hashPassword(password);
    }
    const updatedData = { name, email, phone, password: hashedPassword };

    const agent = await AgentModel.findByIdAndUpdate(req.params.id, { $set: updatedData }, { new: true });

    if (!agent) return res.status(404).json({ message: "Agent not found" });

    res.json({ message: "Agent updated", agent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const agent = await AgentModel.findByIdAndDelete(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    res.json({ message: "Agent deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
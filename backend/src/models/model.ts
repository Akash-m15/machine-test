import { Schema, model } from "mongoose";


const AdminMongoSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}
,{ timestamps: true });


const AgentMongoSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, unique: true, required: true }
},{ timestamps: true });



const TaskMongoSchema = new Schema({
  FirstName: { type: String, required: true },
  Phone: { type: String, required: true },
  Notes: { type: String },
  agentId: { type: Schema.Types.ObjectId, ref: "agent" } 
},{ timestamps: true });





export const AdminModel = model("admin", AdminMongoSchema);
export const AgentModel = model("agent", AgentMongoSchema);
export const TaskModel = model("task", TaskMongoSchema);
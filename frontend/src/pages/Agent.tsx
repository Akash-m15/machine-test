import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/api";

interface Task {
  _id: string;
  FirstName: string;
  Phone: string;
  Notes: string;
  agentId: string;
}

interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export default function Agent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [agent, setAgent] = useState<Agent | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (id) {
      fetchAgent();
      fetchTasks();
    }
  }, [id]);

  const fetchAgent = async () => {
    try {
      const res = await api.get(`/agents/${id}`);
      setAgent(res.data.agent);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/agent/${id}`);
      console.log(res.data.tasks)
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // <div className="p-8">
    //   <Button onClick={() => navigate(-1)}>Back</Button>

    //   {/* Agent Info Card */}
    //   {agent && (
    //     <div className="mt-4 p-4 border rounded-lg shadow-sm bg-white">
    //       <h2 className="text-xl font-bold">{agent.name}</h2>
    //       <p>Email: {agent.email}</p>
    //       <p>Phone: {agent.phone}</p>
    //     </div>
    //   )}

    //   {/* Tasks Table */}
    //   <div className="mt-6 p-4 border rounded-lg shadow-sm bg-white">
    //     <h3 className="text-lg font-bold mb-4">Tasks</h3>
    //     <Table>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead>FirstName</TableHead>
    //           <TableHead>Phone</TableHead>
    //           <TableHead>Notes</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {tasks.map((task) => (
    //           <TableRow key={task._id}>
    //             <TableCell>{task.FirstName}</TableCell>
    //             <TableCell>{task.Phone}</TableCell>
    //             <TableCell>{task.Notes}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </div>
    // </div>
    <div className="p-8 max-w-6xl mx-auto">
  {/* Back Button */}
  <div className="mb-4">
    <Button onClick={() => navigate(-1)}>Back</Button>
  </div>

  {/* Agent Info Card */}
  {agent && (
    <div className="mb-6 p-4 border-b-2 max-w-100 h-40 border-gray-200 rounded-lg shadow-sm bg-white">
      <h2 className="text-xl  p-4 font-bold mb-2">{agent.name}</h2>
      <p className="text-md p-1 text-gray-600"><b>Email:</b> {agent.email}</p>
      <p className="text-md p-1 text-gray-600"><b>Phone:</b> {agent.phone}</p>
    </div>
  )}

  {/* Tasks Table */}
  <div className="p-4 border rounded-lg shadow-sm bg-white">
    <h3 className="text-lg font-bold mb-4">Tasks</h3>
    <div className="overflow-x-auto max-h-[400px]">
      <Table className="min-w-full border border-gray-200">
        <TableHeader>
          <TableRow className="bg-gray-50 sticky top-0 z-10">
            <TableHead className="border-b">FirstName</TableHead>
            <TableHead className="border-b">Phone</TableHead>
            <TableHead className="border-b">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id} className="hover:bg-gray-50">
              <TableCell className="border-b">{task.FirstName}</TableCell>
              <TableCell className="border-b">{task.Phone}</TableCell>
              <TableCell className="border-b">{task.Notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
</div>

  );
}

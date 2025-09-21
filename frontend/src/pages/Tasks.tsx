
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  FirstName: string;
  Phone: string;
  Notes: string;
  agentId: any; // agent _id
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const uploadCSV = async () => {
    if (!file) return;

      const text = await file.text();

    try {
      await api.post(`/tasks/upload`, text, {
        headers: {  "Content-Type": "text/plain" },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks`);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
    }
  };

useEffect(()=>{
fetchTasks();
  
},[tasks])
const navigate = useNavigate();
  return (
    
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-4">
    <Button onClick={() => navigate(-1)}>Back</Button>
  </div>
  <h1 className="text-2xl font-bold mb-4">Tasks</h1>

  <div className="mb-6 flex items-center gap-2">
    <Input
    className="w-60"
      type="file"
      accept=".csv"
      onChange={(e) => setFile(e.target.files?.[0] || null)}
    />
    <Button onClick={uploadCSV}>Upload CSV</Button>
  </div>

  <div className="overflow-x-auto overflow-y-auto max-h-[500px] border rounded-lg">
    <Table className="min-w-full">
      <TableHeader>
        <TableRow className="bg-gray-50 sticky top-0 z-10">
          <TableHead className="border-b">First Name</TableHead>
          <TableHead className="border-b">Phone</TableHead>
          <TableHead className="border-b">Notes</TableHead>
          <TableHead className="border-b">Assigned To</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task._id} className="hover:bg-gray-50">
            <TableCell className="border-b">{task.FirstName}</TableCell>
            <TableCell className="border-b">{task.Phone}</TableCell>
            <TableCell className="border-b">{task.Notes}</TableCell>
            <TableCell className="border-b">{task.agentId?.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</div>

  );
}

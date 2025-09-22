// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import api from "@/lib/api";
// import EditAgent from "./EditAgent";
// import { useNavigate } from "react-router-dom";

// interface Agent {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
// }

// export default function Dashboard() {
//   const [agents, setAgents] = useState<Agent[]>([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);


//   const navigate = useNavigate();

//    const uploadCSV = async () => {
//     if (!file) return;

//       const text = await file.text();

//     try {
//       await api.post(`/tasks/upload`, text, {
//         headers: {  "Content-Type": "text/plain" },
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchAgents();
//   }, []);

//   const fetchAgents = async () => {
//     try {
//       const res = await api.get("/agents")
//       setAgents(res.data.agents);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const createAgent = async () => {
//     // console.log(name, typeof email, phone, password);
//     try {
//       await api.post(
//         "/agents/create",
//         {
//           name,
//           email,
//           phone,
//           password,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       fetchAgents();
//       setIsDialogOpen(false);
//       setName("");
//       setEmail("");
//       setPhone("");
//       setPassword("");
      
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Dashboard - Agents</h1>
//       <div className="mb-6 flex items-center justify-between">
//        <div className=" flex items-center justify-center">
//        <Input className="w-50" type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
//         <Button onClick={uploadCSV} className="ml-2">Upload CSV</Button>
//         </div>
//         <Button onClick={()=>{
//           navigate("/tasks")
//         }}>View All Tasks</Button>
//       </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <Button onClick={() => setIsDialogOpen(true)}>Add Agent</Button>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create Agent</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <Label>Name</Label>
//               <Input value={name} onChange={(e) => setName(e.target.value)} />
//             </div>
//             <div>
//               <Label>Email</Label>
//               <Input value={email} onChange={(e) => setEmail(e.target.value)} />
//             </div>
//             <div>
//               <Label>Phone</Label>
//               <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
//             </div>
//             <div>
//               <Label>Password</Label>
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <Button onClick={createAgent}>Save</Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Agents Table */}
//       <Table className="mt-6">
//         {/* <TableCaption>List of Agents</TableCaption> */}
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Phone</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {agents.map((agent) => (
            
//             <TableRow key={agent._id}>
//               <TableCell>{agent.name}</TableCell>
//               <TableCell>{agent.email}</TableCell>
//               <TableCell>{agent.phone}</TableCell>
//               <TableCell><EditAgent agent={agent} onUpdated={fetchAgents} /></TableCell>
//               <TableCell><Button
//                   variant="outline"
//                   onClick={() => navigate(`/agent/${agent._id}`)}
//                 >
//                   View Tasks
//                 </Button></TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import EditAgent from "./EditAgent";
import { useNavigate } from "react-router-dom";

interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const uploadCSV = async () => {
    if (!file) return;

    const text = await file.text();

    try {
      await api.post(`/tasks/upload`, text, {
        headers: { "Content-Type": "text/plain" },
      });
      alert("Upload Successful")
      setFile(null); // Clear file after upload
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await api.get("/agents");
      setAgents(res.data.agents);
    } catch (err) {
      console.error(err);
    }
  };

  const createAgent = async () => {
    try {
      await api.post(
        "/agents/create",
        { name, email, phone, password },
        { withCredentials: true }
      );
      fetchAgents();
      setIsDialogOpen(false);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

 

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold mb-4 p-6 text-center ">DASHBOARD - Agents</h1>
        {/* <span className="block border mb-8"></span> */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center  md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept=".csv"
              className="w-60"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button onClick={uploadCSV}>Upload CSV</Button>
          </div>
          <div className="flex items-center justify-around gap-2">

          <Button onClick={() => navigate("/tasks")}>View All Tasks</Button>
          <Button onClick={() => setIsDialogOpen(true)}>Add Agent</Button>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button onClick={createAgent} className="w-full">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Agents Table */}
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <Table className="min-w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-gray-100 border-b">
                <TableHead className="border-r">Name</TableHead>
                <TableHead className="border-r">Email</TableHead>
                <TableHead className="border-r">Phone</TableHead>
                <TableHead className="border-r">Edit</TableHead>
                <TableHead>Tasks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow
                  key={agent._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="border-r">{agent.name}</TableCell>
                  <TableCell className="border-r">{agent.email}</TableCell>
                  <TableCell className="border-r">{agent.phone}</TableCell>
                  <TableCell className="border-r">
                    <EditAgent agent={agent} onUpdated={fetchAgents} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/agent/${agent._id}`)}
                    >
                      View Tasks
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

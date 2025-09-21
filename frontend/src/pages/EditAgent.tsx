

import { useState} from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";

interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface Props {
  agent: Agent;
  onUpdated: () => void;
}

export default function EditAgent({ agent, onUpdated }: Props) {
  const [name, setName] = useState(agent.name);
  const [email, setEmail] = useState(agent.email);
  const [phone, setPhone] = useState(agent.phone);
 const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateAgent = async () => {
    try {
      await api.put(`/agents/${agent._id}`, {
        name,
        email,
        phone,
      });
      onUpdated();
       setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Agent</DialogTitle>
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
          <Button onClick={updateAgent}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

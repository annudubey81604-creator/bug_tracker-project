import { useEffect, useState } from "react";
import API from "../api";

export default function Bugs() {
  const [bugs, setBugs] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");

  const fetchBugs = async () => {
    try {
      const res = await API.get("/bugs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBugs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleAddBug = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post(
        "/bugs",
        { title, description, severity },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Bug added successfully!");
      setTitle("");
      setDescription("");
      setSeverity("low");
      fetchBugs();
    } catch (err) {
      console.error(err);
      alert("Failed to add bug");
    }
  };

  return (
    <div>
      <h1>All Bugs</h1>

      <form onSubmit={handleAddBug}>
        <input
          type="text"
          placeholder="Bug Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Bug Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Bug</button>
      </form>

      <ul>
        {bugs?.map((bug) => (
          <li key={bug.id}>
            {bug.title} - {bug.severity}
          </li>
        ))}
      </ul>
    </div>
  );
}

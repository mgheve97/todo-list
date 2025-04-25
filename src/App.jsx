import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskBoard from "./list/TaskBoard";
import CreateTask from "./list/CreateTask";
import ListLayout from "./list/layout";
import UpdateTask from "./list/UpdateTask";

function App() {
  return (
    <Router>
      <ListLayout>
        <Routes>
          <Route path="/" element={<TaskBoard />} />
          <Route path="/file/create" element={<CreateTask />} />
          <Route path="/task/:id" element={<UpdateTask />} />
        </Routes>
      </ListLayout>
    </Router>
  );
}

export default App;

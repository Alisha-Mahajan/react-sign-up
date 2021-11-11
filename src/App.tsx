import Dashboard from "./components/Dashboard/Dashboard";
import SignUpFuncForm from "./components/SignUpFuncForm/SignUpFuncForm";
import styles from "./sass/App.module.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<SignUpFuncForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

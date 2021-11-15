import axios from "axios";
import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    fetchPosts();
  });

  const fetchPosts = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(({data}) => console.log(data))
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <div>
      <h1>Welcome to dashboard!!!</h1>
    </div>
  );
}

export default Dashboard;

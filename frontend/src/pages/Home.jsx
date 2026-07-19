import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>VAYRE</h1>
      <p>Considered essentials.</p>
      <Link to="/shop">Shop the collection</Link>
    </div>
  );
}

export default Home;
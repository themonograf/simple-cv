import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Link to="/new">
        <button className="rounded-md border-blue-500 bg-transparent text-blue-500 transition-all hover:bg-blue-500 hover:text-white">
          Create CV
        </button>
      </Link>
    </div>
  );
};

export default Home;

import { BiLoaderAlt } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      <BiLoaderAlt className="animate-spin text-4xl" />
    </div>
  );
};

export default Loader;

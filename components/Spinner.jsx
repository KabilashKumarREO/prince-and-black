import SyncLoader from "react-spinners/SyncLoader";

const Spinner = () => {
  return (
    <div
      id="spinner"
      className="w-[100%] h-[100vh] flex flex-row justify-center items-center"
    >
      <SyncLoader color="#2563EB" margin={12} />
    </div>
  );
};

export default Spinner;

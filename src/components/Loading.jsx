import loading from "../assets/loading.svg";

export function Loading() {
  return (
    <div className="spinner text-xl flex gap-4 items-center">
      <img src={loading} alt="loading" className=" w-10 h-10" />
      <span className="dark:text-white">Loading...</span>
    </div>
  );
}

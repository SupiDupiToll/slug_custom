import MaterialIcon from "@/components/icons/material";

const Loading = () => {
  return (
    <div className="mt-14 flex w-full flex-col items-center text-slate-400 duration-100 animate-in fade-in-20">
      <MaterialIcon
        name="progress_activity"
        size={20}
        className="animate-spin"
      />
      <p className="mt-2">Loading...</p>
    </div>
  );
};

export default Loading;

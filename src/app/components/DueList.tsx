import { Checkbox } from "@mui/material";

export default function DueList() {
    return (
      <div className="flex bg-yellow-500 rounded-md border-black border items-center h-1/2 p-8">
        <Checkbox />
        <div className="text-black">
            Assignment due in 1 minute
        </div>
      </div>
    );
  }
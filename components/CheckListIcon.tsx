import { ListTodo } from "lucide-react";

export default function CheckListIcon() {
  return (
    <div className="relative flex flex-row justify-center items-center w-fit h-fit">
      <svg className="w-12 h-12 effect-svg-default">
        <circle className="stroke-white fill-white" r={24} cx={24} cy={24} />
      </svg>
      <ListTodo size={24} className="absolute stroke-primary" />
    </div>
  );
}

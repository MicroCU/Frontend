import { Handle, Position } from "reactflow";
import { groupMember } from "../node-edges";
import { defaultSettings } from "../setting";
import { IMicroNode } from "@/types/type";

export default function UnorderedGroupNode({
  id,
  data,
  isConnectable
}: {
  id: string;
  data: { label: string };
  isConnectable: boolean;
}) {
  let member: IMicroNode[] = groupMember.get(id)?.members || [];
  return (
    <div
      style={{
        backgroundColor: "blue",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "fit-content"
      }}
    >
      <p
        style={{
          backgroundColor: "transparent",
          textAlign: "left",
          position: "absolute",
          top: "-20px"
        }}
      >
        {" "}
        {data.label}{" "}
      </p>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div
        style={{
          backgroundColor: "red",
          display: "flex",
          flexDirection: "row"
        }}
      >
        {member.map((value, index) => {
          return (
            <div
              style={{
                backgroundColor: "#ffabdc",
                marginRight: `${
                  index !== member.length - 1
                    ? defaultSettings.Margin + "px"
                    : ""
                }`,
                width: `${defaultSettings.singleWidth}px`,
                height: `${defaultSettings.singleHeight}px`
              }}
              key={value.id}
            >
              {" "}
              {value.name}
            </div>
          );
        })}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

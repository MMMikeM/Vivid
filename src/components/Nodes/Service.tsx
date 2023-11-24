import { Group } from "@visx/group";
import { ReactNode } from "react";
import { FileCode2, FileEdit } from "lucide-react";
import { HierarchyNode } from "../Node";
import { dialogProxy } from "../../store/dialog";

type ServiceProps = {
  node: HierarchyNode;
};

export const Service = ({ node }: ServiceProps) => {
  const width = 360;
  const height = 248;

  const { name, description, documentationUrl, team, type } = node.data;

  return (
    <Group
      className="cursor-pointer"
      top={node.y}
      left={node.x}
      style={{ cursor: "pointer !important" }}
    >
      <foreignObject
        width={width}
        height={height}
        x={-width / 2}
        y={-height / 2}
        style={{ pointerEvents: "none" }}
      >
        <div className="relative bg-white p-4 h-full rounded-lg shadow">
          <div className="flex flex-col gap-4">
            <div className="flex relative">
              <Field
                name={name!}
                label="Name"
                className="mr-auto capitalize mt-2"
              />
              <div className="flex justify-end gap-2 absolute top-0 right-0">
                <FileCode2
                  size={28}
                  className="text-gray-400 hover:text-gray-500 p-1 -mt-1 -mr-1 hover:bg-slate-100 rounded"
                  onClick={() => window.open(documentationUrl, "_blank")}
                  style={{ pointerEvents: "all" }}
                />
                <FileEdit
                  size={28}
                  className="text-gray-400 hover:text-gray-500 p-1 -mt-1 hover:bg-slate-100 rounded"
                  onClick={() => {
                    dialogProxy.open = true;
                    dialogProxy.node = node.data;
                  }}
                  style={{ pointerEvents: "all" }}
                />
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <Field name={type!} label="Type" className="w-1/2" />
              <Field name={team!} label="Team" className="w-1/2" />
            </div>
            <Description>{description}</Description>
          </div>
        </div>
      </foreignObject>
    </Group>
  );
};

type FieldProps = {
  name: string;
  label: string;
  className?: string;
};

const Field = ({ name, label, className }: FieldProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="text-gray-400 text-xs">{label}:</div>
      <div className="text-gray-900 font-medium line-clamp-1">{name}</div>
    </div>
  );
};

type DescriptionProps = {
  children: ReactNode;
  className?: string;
};

const Description = ({ className, children }: DescriptionProps) => {
  return (
    <div
      className={`flex flex-col pt-3 -mt-1 border-t-[1px] border-slate-300 border-solid ${className}`}
    >
      <div className="text-gray-400 text-xs">Description:</div>
      <div className="text-gray-900 line-clamp-3">{children}</div>
    </div>
  );
};

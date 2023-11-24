import { Button } from "../../@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { dialogProxy } from "../store/dialog";
import { useSnapshot } from "valtio";
import { AutoComplete } from "./AutoComplete";
import { dictProxy } from "../store/tree";

export function EditDialog() {
  const dialogState = useSnapshot(dialogProxy);

  if (!dialogState.node) return null;

  return (
    <Dialog open={dialogState.open}>
      <DialogContent className="w-2/3">
        <DialogHeader>
          <DialogTitle>Edit Node</DialogTitle>
          <DialogDescription>
            Make changes to this node here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              value={dialogState.node.name}
              onChange={(e) => (dialogProxy.node!.name = e.target.value)}
              id="name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="team" className="text-left">
              Team
            </Label>
            <div className="col-span-3">
              <AutoComplete
                value={dialogState.node.team!}
                onSelect={(newVal) => {
                  dialogProxy.node!.team = newVal;
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              value={dialogState.node.description}
              onChange={(e) => (dialogProxy.node!.description = e.target.value)}
              rows={10}
              id="description"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              dialogProxy.open = false;
            }}
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              dialogProxy.open = false;
              dictProxy[dialogState.node!.id] = {
                ...dictProxy[dialogState.node!.id],
                ...dialogState.node!,
              };
            }}
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { AutoComplete } from "./AutoComplete";
import { Button } from "../../@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
} from "../../@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Drawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="rounded-none w-12  h-12 flex z-10 bg-transparent fixed top-0 left-0 p-0 hover:bg-slate-700 border-transparent"
          variant="outline"
        >
          <Menu size={36} className="text-slate-50" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-2 pt-8 text-black bg-white ">
        <SheetHeader>
          <SheetDescription>Filter by team/pod</SheetDescription>
        </SheetHeader>
        <div>
          <AutoComplete />
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}

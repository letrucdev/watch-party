import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "../ui/input";

export const Chat = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ScrollArea className="flex flex-col flex-grow">
        <div className="text-sm hover:bg-primary-foreground py-2 px-4 cursor-pointer">
          <span className="font-semibold mr-2 text-muted-foreground">User 1</span>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            debitis commodi labore est, suscipit voluptatem! Nisi, voluptatibus!
            Libero atque ipsa impedit nulla voluptatem? Magnam, similique ullam?
            Pariatur modi non dolorem!
          </span>
        </div>
        <div className="text-sm hover:bg-primary-foreground py-2 px-4 cursor-pointer">
          <span className="font-semibold mr-2 text-muted-foreground">User 1</span>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            debitis commodi labore est, suscipit voluptatem! Nisi, voluptatibus!
            Libero atque ipsa impedit nulla voluptatem? Magnam, similique ullam?
            Pariatur modi non dolorem!
          </span>
        </div>
        <div className="text-sm hover:bg-primary-foreground py-2 px-4 cursor-pointer">
          <span className="font-semibold mr-2 text-muted-foreground">User 1</span>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            debitis commodi labore est, suscipit voluptatem! Nisi, voluptatibus!
            Libero atque ipsa impedit nulla voluptatem? Magnam, similique ullam?
            Pariatur modi non dolorem!
          </span>
        </div>
        <div className="text-sm hover:bg-primary-foreground py-2 px-4 cursor-pointer">
          <span className="font-semibold mr-2 text-muted-foreground">User 1</span>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            debitis commodi labore est, suscipit voluptatem! Nisi, voluptatibus!
            Libero atque ipsa impedit nulla voluptatem? Magnam, similique ullam?
            Pariatur modi non dolorem!
          </span>
        </div>
        <div className="text-sm hover:bg-primary-foreground py-2 px-4 cursor-pointer">
          <span className="font-semibold mr-2 text-muted-foreground">User 1</span>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            debitis commodi labore est, suscipit voluptatem! Nisi, voluptatibus!
            Libero atque ipsa impedit nulla voluptatem? Magnam, similique ullam?
            Pariatur modi non dolorem!
          </span>
        </div>
      </ScrollArea>
      <div className="px-2 pt-2">
        <Input type="text" placeholder="Nhập tin nhắn..." className="focus-visible:ring-transparent" />
      </div>
    </div>
  );
};

import * as React from "react";
import {CircleX, Search} from "lucide-react";

import {cn} from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    hasContent: boolean,
    clearText: () => void
}

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, hasContent, clearText, ...props}, ref) => {


        return (
            <div
                className={cn(
                    "flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
            >
                <input
                    autoComplete={"off"}
                    className="bg-transparent outline-none w-full mr-2 peer"
                    type={type}
                    ref={ref}
                    {...props}
                />

                {!hasContent &&
                    <Search
                        size={18}
                        className="text-muted-foreground peer-focus:text-primary transition-colors"
                    />}
                {hasContent &&
                    <CircleX
                        onClick={clearText}
                        size={18}
                        className="text-muted-foreground peer-focus:text-primary transition-colors cursor-pointer"
                    />}
            </div>
        );
    }
);
InputSearch.displayName = "Input";

export {InputSearch};

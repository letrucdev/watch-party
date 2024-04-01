import { LoaderCircle } from "lucide-react";

export default function MenuLoading() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <LoaderCircle className="animate-spin" />
        </div>
    );
}

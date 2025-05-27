import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const FillLoading = () => {
     <Skeleton className="absolute inset-0 w-full h-full bg-gray-200 dark:bg-gray-800 justify-center items-center opactity-70 z-50">
          <Loader2 className="animate-spin" />
     </Skeleton>
}

export default FillLoading
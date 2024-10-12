'use client'
import { Skeleton } from "@nextui-org/skeleton";

const TablaSkeleton = ({ columnas }: any) => {
    return (
        <>
            {Array.from({ length: 20 }).map((_, index) => (
                <tr key={index} className="border-b">
                    {Array.from({ length: columnas }).map((_, index) => (
                        <td key={index} className="text-ellipsis truncate px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                            <Skeleton className="h-3 w-full rounded-lg" />
                        </td>
                    ))}
                </tr>

            ))}
        </>
    );
};

export default TablaSkeleton;

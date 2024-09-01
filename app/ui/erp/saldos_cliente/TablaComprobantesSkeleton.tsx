'use client'
import { Skeleton } from "@nextui-org/skeleton";

const TablaComprobantesSkeleton = () => {
    return (
        <>
            {Array.from({ length: 20 }).map((_, index) => (
                <tr key={index} className="border-b">
                    <td className="text-ellipsis truncate px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                        <Skeleton className="h-3 w-full rounded-lg" />
                    </td>
                    <td className="text-ellipsis truncate px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                        <Skeleton className="h-3 w-full rounded-lg" />
                    </td>
                    <td className="text-ellipsis truncate px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                        <Skeleton className="h-3 w-full rounded-lg" />
                    </td>
                    <td className="text-ellipsis truncate px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                        <Skeleton className="h-3 w-full rounded-lg" />
                    </td>
                    <td className="text-ellipsis truncate px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                        <Skeleton className="h-3 w-full rounded-lg" />
                    </td>
                    <td className="text-ellipsis truncate px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                        <Skeleton className="h-3 w-full rounded-lg" />
                    </td>
                    <td className="text-ellipsis truncate px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                        <Skeleton className="h-3 w-full rounded-lg" />
                    </td>
                    <td className="text-ellipsis truncate px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                        <Skeleton className="h-3 w-full rounded-lg" />
                    </td>
                </tr>

            ))}
        </>
    );
};

export default TablaComprobantesSkeleton;

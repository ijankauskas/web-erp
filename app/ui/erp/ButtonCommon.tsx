import { Tooltip } from "@nextui-org/react";

export default function ButtonCommon({ texto, onClick, type, desactivado, tooltip = '', px="px-4", py="py-2"  }: any) {
    const buttonContent = (
        <button
            onClick={onClick}
            type={type}
            className={`w-full text-end flex items-center justify-center inline-flex ${px} ${py} border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                        ${desactivado ? 'bg-gray-300' : 'bg-primary hover:bg-indigo-700'}`}
            disabled={desactivado}
        >
            {texto}
        </button>
    );

    return (
        tooltip ? (
            <Tooltip
                placement="bottom"
                content={tooltip}
                radius="sm"
                delay={0}
                closeDelay={0}
                classNames={{
                    base: [
                        // arrow color
                        "before:bg-neutral-400 dark:before:bg-white",
                    ],
                    content: [
                        "text-white py-2 px-4 shadow-xl bg-gray-400",
                    ],
                }}
            >
                {buttonContent}
            </Tooltip>
        ) : (
            buttonContent
        )
    );
}

import { Tooltip } from "@nextui-org/react";

export default function ButtonCommon({ texto, onClick, type, desactivado, tooltip = '', px = "px-4", py = "py-2", color = 'primary' }: any) {

    const colores: any = {
        primary: 'bg-primary hover:bg-indigo-700 focus:ring-indigo-500',
        danger: 'bg-red-500 hover:bg-red-700 focus:ring-red-500',
        other: 'bg-gray-600 hover:bg-gray-800 focus:ring-gray-600',
    };

    const buttonContent = (
        <button
            onClick={onClick}
            type={type}
            className={`w-full text-end items-center justify-center inline-flex ${px} ${py} border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 
                        ${desactivado ? 'bg-gray-300' : `${colores[color]}`}`}
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

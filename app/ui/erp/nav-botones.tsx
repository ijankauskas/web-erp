import Link from 'next/link';
import { SignOut } from './SingOut';
import { Accordion, AccordionItem, Tooltip } from '@nextui-org/react';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function NavBotones({ navigation, open }: any) {
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <>
            {navigation.map((item: any, index: number) => (
                item.subMenu.length > 0 ? (
                    <Accordion key={index} variant="splitted" className='text-white py-0.5'>
                        <AccordionItem
                            key="1"
                            aria-label="Accordion 1"
                            title={<p className='text-white'> {open ? <span className='flex'><item.icon className="h-6 w-6 text-white mr-2" aria-hidden="true"/> {item.nombre}</span> : <item.icon className="h-6 w-6 text-white" aria-hidden="true" />}</p>}
                            className='bg-gray-800 text-white'
                        >
                            <div className="">
                                {item.subMenu.map((subMenu: any, index: any) => (
                                    <Tooltip
                                        key={index}
                                        placement="right-start"
                                        content={(
                                            <div className="p-0 w-[200px]">
                                                {subMenu.pantallas.map((pantalla: any, index: any) => (
                                                    <Link
                                                        key={index}
                                                        href={pantalla.href}
                                                        className={classNames(
                                                            pantalla.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md '
                                                        )}
                                                    >
                                                        <p className='mr-6'><pantalla.icon className="h-6 w-6 text-white" aria-hidden="true" /></p>
                                                        <p className='text-right'>{pantalla.nombre}</p>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                        radius="sm"
                                        delay={0}
                                        offset={0}
                                        closeDelay={0}
                                        classNames={{
                                            base: [
                                                "before:bg-neutral-400 dark:before:bg-white",
                                            ],
                                            content: [
                                                "text-white py-2 px-4 shadow-xl bg-gray-400",
                                            ],
                                        }}
                                    >
                                        <button className="text-white w-full text-start hover:bg-gray-700 p-2 rounded-md">
                                            {subMenu.nombre}
                                        </button>
                                    </Tooltip>
                                ))}
                            </div>
                        </AccordionItem>
                    </Accordion>
                ) : (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={
                            classNames(
                                item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                            )}
                    >
                        <item.icon className="mr-3 h-6 w-6 text-gray-400" aria-hidden="true" />
                        {item.name}
                    </Link>
                )
            ))}
            <SignOut />
        </>
    );
}

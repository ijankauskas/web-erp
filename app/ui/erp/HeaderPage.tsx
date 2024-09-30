
export default function HeaderPage({ titulo }: any) {
    return (
        <div className="lg:flex lg:items-center lg:justify-between border-b">
            <div className="w-full flex items-center justify-between py-4">
                <h3 className="w-1/3 items font-semibold leading-7 text-gray-900 text-lg">
                    {titulo}
                </h3>
            </div>
        </div>
    )
}

export default function PulseLoading() {
    return (
        <section className="text-gray-600 body-font">
            <div className="pb-24 mx-auto">
                <div className="flex flex-wrap justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8]?.map((i: number) => (
                        <div key={i} className="border border-blue-300 shadow rounded-md p-4 m-4 w-72 mx-5">
                            <div className="animate-pulse flex space-x-4">
                                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-700 rounded"></div>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}



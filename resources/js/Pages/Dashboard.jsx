import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({totalRows,totalVisits}) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='sm:flex sm:space-x-4 space-y-4 sm:space-y-0 justify-center'>
                                <div className='py-2 px-4 bg-blue-800 text-white rounded-lg h-28 sm:w-64 w-full flex flex-col justify-center'>
                                   <p className='text-center'>Total Links </p>
                                   <p className='text-center'> {totalRows} </p>
                                </div>
                                <div className='py-2 px-4 bg-green-800 text-white rounded-lg h-28 sm:w-64 w-full flex flex-col justify-center'>
                                <p className='text-center'>Total Visits </p>
                                <p className='text-center'> {totalVisits} </p>
                                     
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';

export default function UrlShorter({ myurls,host_url }) {
    const [urls, setUrls] = useState(myurls);
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const validateUrl = (value) => {
        const urlRegex = /^(https?:\/\/)([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(:\d+)?(\/[^\s]*)?$/i;
        return urlRegex.test(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateUrl(url)) {
            setError('');
            axios.post(route('url-short-insert'), { 'original_url': url }).then(resp => {
                // console.log(resp)
                if (resp.data.success) {                   
                    setUrls(resp.data.myurls)
                    setUrl('');
                    Swal.fire({
                        title: 'success',
                        text: resp.data.success,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                      })
                    
                }
                if(resp.data.error){
                    Swal.fire({
                        title: 'error',
                        text: resp.data.error,
                        icon: 'error',
                        showConfirmButton: true,
                        confirmButtonText: 'Ok'
                      })
                }
            })
        } else {
            
            setError('Please enter a valid URL starting with http or https.');
        }
    };

    const handleCopy = async (value) => {
        try {
            await navigator.clipboard.writeText(value);
            Swal.fire({
                title: 'success',
                text: 'Copy to clipboard',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
                //confirmButtonText: 'Cool'
              })
            
          } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
              })
            // console.log(error)
            // setCopySuccess('Failed to copy text.'); 
          }
      };

    const handleStatusChange = (status,url) =>{
        const updatedStatus = status
        axios.post(route('url-short-status-update'), { 'status': status,'id':url.id }).then(resp => {
            if (resp.data.success) {
                if (resp.data.success) {
                    Swal.fire({
                        title: 'success',
                        text: resp.data.success,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                      })
                    setUrls((prevUrls) => {
                        return {
                            ...prevUrls,
                            data: prevUrls.data.map((item) =>
                                item.id === url.id
                                    ? { ...item, status: updatedStatus } // Update the status of the matching item
                                    : item
                            ),
                        };
                    });
                }
            }
        })
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Short Urls
                </h2>
            }
        >
            <Head title="My Short Urls" />

            <div className="overflow-hidden bg-white shadow-sm border py-5">
                <div className="flex items-center justify-center bg-white px-4">

                    <div className="bg-white shadow-md rounded-lg p-6 sm:max-w-3xl w-full border">

                        <form onSubmit={handleSubmit} className="">
                            <label htmlFor="url" className="block text-gray-700 font-medium">
                                Enter URL:
                            </label>
                            <div className='flex'>
                                <div className='w-full'>
                                    <input
                                        type="text"
                                        id="url"
                                        name="url"
                                        placeholder="https://example.com"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className={`w-full px-4 py-2 border border-r-0 rounded-s-lg shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />

                                </div>
                                <button
                                    type="submit"
                                    className="w-24 bg-blue-600 text-white py-1 px-4 rounded-e-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-400"
                                >
                                    Generate
                                </button>
                            </div>
                            {error && (
                                <p className="mt-2 text-sm text-red-500">{error}</p>
                            )}
                        </form>
                    </div>
                    
                </div>
                {/* Short Url List */}
                <div className='border sm:mx-20 my-5'>
                        <div className="container mx-auto p-4">
                            <table className="min-w-full table-auto border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b text-left">SL</th>
                                        <th className="px-4 py-2 border-b text-left w-">URL</th>
                                        <th>Visits</th>
                                        <th className="px-4 py-2 border-b text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {urls.data.map((url,index) => (
                                        <tr key={url.id} className='odd:bg-blue-100'>
                                            <td className="px-4 py-2 border-b">{(urls.current_page*urls.per_page - urls.per_page) + index+1}</td>
                                            <td className="px-4 py-2 border-b">
                                                <div className='flex flex-col space-y-2'>
                                                    <div className='flex space-x-2'><span className='w-24'>Original</span><span>{url.original_url}</span></div>
                                                    <div className='flex space-x-2'><span className='w-24'>Short</span><a href={`${host_url}/${url.short_url}`} target='_blank' className='text-blue-500'>{host_url}/{url.short_url}</a></div>
                                                </div>
                                            </td>
                                            <td className='text-center'>{url.visit_count}</td>
                                            
                                            <td className="px-4 py-2 border-b">
                                                <div className='flex space-x-2'>
                                                    <a href={`${host_url}/${url.short_url}`} target='_blank' className='px-2 py-1 bg-sky-800 text-white rounded'>Visit</a>
                                                    <button onClick={() => handleCopy(`${host_url}/${url.short_url}`)} className='px-2 py-1 bg-green-800 text-white rounded'>Copy</button>
                                                    <input type='checkbox' className='my-2' checked={url.status} onChange={()=> handleStatusChange(!url.status, url)} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination Controls */}
                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <span className="text-sm">
                                        Showing {myurls.data.length} of {myurls.total} URLs
                                    </span>
                                </div>
                                <div className="flex space-x-2">
                                    {/* Previous Page Button */}
                                    {myurls.prev_page_url && (
                                        <a
                                            href={myurls.prev_page_url}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                        >
                                            Previous
                                        </a>
                                    )}

                                    {/* Next Page Button */}
                                    {myurls.next_page_url && (
                                        <a
                                            href={myurls.next_page_url}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                        >
                                            Next
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </AuthenticatedLayout>
    );
}

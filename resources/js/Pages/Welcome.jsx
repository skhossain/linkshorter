import HomeLayout from '@/Layouts/HomeLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    
    return (
        <HomeLayout>
            <Head title="Welcome" />
            <style>
                {`.animated-text {
                    font-size: 2rem;
                    font-weight: bold;
                    color: transparent;
                    background-image: linear-gradient(to right, #3b82f6 45%, #ef4444 1%, #22c55e 55%);
                    background-size: 200% 100%; /* Makes the gradient twice as wide */
                    background-position: 100% 0; /* Start at the right */
                    background-clip: text; /* Clips gradient to the text */
                    -webkit-background-clip: text; /* For Safari */
                    animation: slide 3s linear infinite;
                    }

                    @keyframes slide {
                    0% {
                        background-position: 100% 0; /* Start at the right */
                    }
                    100% {
                        background-position: 0% 0; /* Move to the left */
                    }
                    }`}
            </style>
            <h1 className='text-3xl font-bold text-center uppercase animated-text'>Welcome to Sheba Short Link Service.</h1>
            <div className='text-center py-10'>
                <Link href={route('register')}
                className='py-2 px-4 rounded-md bg-blue-700 hover:bg-blue-600 text-white'>Get Started</Link>
            </div>
        </HomeLayout>
    );
}

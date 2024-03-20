import React from 'react'
import { useQuery } from '@tanstack/react-query';

const fetchTest = async () => {
    const api = await fetch("http://localhost:3003/");
    const response = await api.json();
    return response;
};

function Hero() {
    const  { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ["features"],
        queryFn: fetchTest,
    });

    if (isError) return <div>errorr...</div>
    if (isLoading) return <div>loading...</div>

    
    return (
        <div>
            <div className="flex hero items-center">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='flex flex-col gap-4'>
                        <h1 className="text-5xl font-bold">⌚CuyModoro</h1>
                        
                        <div>
                            <input type="text" placeholder="Fitur yang ingin Anda kerjakan" className="input input-bordered w-full max-w-xl py-2 px-4 rounded-md" />
                            <select defaultValue={'DEFAULT'} className="select select-bordered w-full max-w-xl py-2 px-4">
                                <option value="DEFAULT" disabled>Pilih Break Level?</option>
                                <option value={"1"}>New Commer</option>
                                <option value={"2"}>Reguler</option>
                                <option value={"3"}>Enthusiast</option>
                            </select>
                        </div>
                        <button className="btn btn-primary">api status: {data.status}</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Hero
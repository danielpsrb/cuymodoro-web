import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// const checkApiStatus = async () => {
//     const api = await fetch("http://localhost:3003/");
//     const response = await api.json();
//     return response;
// };

function Hero() {
    const [title, setTitle] = useState("")
    const [level, setLevel] = useState("")


    const mutation = useMutation({
        mutationFn: ({ title, level }) => {
            axios.post("http://localhost:3003/features/add", {
                title,
                level,
            });
        }
    })

    // const  { isLoading, isError, isSuccess, data } = useQuery({
    //     queryKey: ["addFeatures"],
    //     queryFn: addFeatures({title, level}),
    // });

    // if (isError) return <div>opss sorry.. error loaded data...</div>
    // if (isLoading) return <div>loading data...</div>


    return (
        <div className="flex hero items-center">
            {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
            ) : null}
            <div className="hero-content flex-col lg:flex-row">
                <div className='flex flex-col gap-4'>
                    <h1 className="text-5xl font-bold">⌚CuyModoro</h1>

                    <div>
                        <input
                            type="text"
                            placeholder="Fitur yang ingin Anda kerjakan"
                            className="input input-bordered w-full max-w-xl py-2 px-4 rounded-md"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <select defaultValue={'DEFAULT'} className="select select-bordered w-full max-w-xl py-2 px-4" onChange={(e) => setLevel(e.target.value)}>
                            <option value="DEFAULT" disabled >Pilih Break Level?</option>
                            <option value={"newcommers"}>New Commer</option>
                            <option value={"reguler"}>Reguler</option>
                            <option value={"enthusiast"}>Enthusiast</option>
                        </select>
                    </div>
                    {mutation.isSuccess ? <div>Fitur added!</div> : null}
                    <button className="btn btn-primary" onClick={() => {
                        mutation.mutate({ title, level })
                    }}>Submit
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Hero
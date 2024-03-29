import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

function timeNow() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes}`
    return time;
}

function Hero() {
    const [title, setTitle] = useState("")
    const [level, setLevel] = useState("")
    const [status, setStatus] = useState("")
    const [featureId, setFeatureId] = useState(0)
    const [isStarted, setIsStarted] = useState(false)

    const addFeatures = useMutation({
        mutationFn: ({ title, level }) => {
            axios.post("http://localhost:3003/features/add", {
                title,
                level,
            }).then(({ data: id }) => setFeatureId(id)).catch(() =>{"error"});
        }
    });

    const breakFeatures = useMutation({
        mutationFn: () => {
            axios.put("http://localhost:3003/features/break", {
                id: featureId.id,
                break_time: timeNow(),
            });
            axios.get(`http://localhost:3003/features/status/${featureId}`)
            .then((r) => setStatus(r.data.status))
            .catch((e) => console.log('Error fetching datas'));
        },
    });

    return (
        <div className="flex hero items-center">
            {addFeatures.isError || breakFeatures.isError ? (
            <div>An error occurred: {addFeatures.error ? addFeatures.error.message : breakFeatures.error.message}</div>
            ) : null}
            <div className="hero-content flex-col lg:flex-row">
                <div className='flex flex-col gap-4'>
                    <h1 className="text-5xl font-bold">⌚CuyModoro</h1>

                    <div className='flex flex-col gap-3'>
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
                    {addFeatures.isSuccess ? <div>Fitur added !</div> : null}
                    {status && <div>Status info: {status}</div>}
                    {breakFeatures.isSuccess ? <div>Take a break for xx:xx minutes</div> : null}
                    <button 
                        className='btn btn-primary'
                        onClick={() => {
                            if (isStarted) {
                                breakFeatures.mutate();
                                setIsStarted(false);
                            } else {
                                addFeatures.mutate({ title, level, })
                                setIsStarted(true)
                            }
                        }}
                    >
                        { isStarted ? "Pause": "Mulai Lagi"}
                    </button>
                    <button onClick={() => {
                        alert(`feature ${title} selesai`)
                    }}>
                        Task Selesai
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero
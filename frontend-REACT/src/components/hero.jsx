import React from 'react'

function Hero() {
    return (
        <div>
            <div className="flex hero items-center">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='flex flex-col gap-4'>
                        <h1 className="text-5xl font-bold">⌚CuyModoro</h1>
                        <div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full rounded-md" />
                        </div>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
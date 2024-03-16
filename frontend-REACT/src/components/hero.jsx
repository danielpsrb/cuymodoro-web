import React from 'react'

function Hero() {
    return (
        <div>
            <div className="flex hero items-center bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div>
                        <h1 className="text-5xl font-bold">⌚CuyModoro</h1>
                        <p className="py-6">
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
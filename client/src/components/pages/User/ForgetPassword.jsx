import React, { useState } from 'react'

const ForgetPassword = () => {
    const [stage, setStage] = useState(1)
    return (
        <div>
            {
                stage === 1 &&
                <div className=' w-full min-h-screen'>
                    <input className='outline-none rounded-xl p-1' type="email" placeholder='type your email for forget password' />
                    <input type="number" placeholder='OTP' min={0} />
                    <button
                        onClick={() => setStage(stage + 1)} className='bg-red-400 p-1' >Next</button>
                </div>
            }
            {
                stage === 2 &&
                <div className=' w-full min-h-screen'>
                    <input className='outline-none rounded-xl p-1' type="password" placeholder='Create new password' />
                    <input className='outline-none rounded-xl p-1' type="password" placeholder='comfirm password' />
                    <button
                        onClick={() => setStage(stage + 1)} className='bg-red-400 p-1' >Next</button>
                </div>
            }

        </div>

    )
}

export default ForgetPassword
import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { useSelector } from 'react-redux'

const Connections = () => {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch()
    const fetchConnections = async () => {

        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
            dispatch(addConnections(res.data.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    // avoid react from crashing during the first render.
    if (!connections) return;

    if (connections.length === 0) return <h1 className="text-center text-xl mt-10">You haven’t made any links yet. Start building your LinkChat network!</h1>;

    return (
        <div className='text-center my-5 h-screen '><h1 className='text-bold text-3xl my-2'>Your LinkChat Network</h1>

            {connections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

                return (
                    <div key={_id} className='flex m-4 p-2 rounded-lg bg-base-300 w-1/2 mx-auto'>
                        <div><img alt="Photo" className="w-25 h-25 rounded-full" src={photoUrl} /></div>
                        <div className='text-left mx-5'>
                            <h1 className="font-bold text-xl">{firstName + " " + lastName}</h1>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections
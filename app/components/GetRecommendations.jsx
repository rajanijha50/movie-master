'use client'
import React, { useEffect, useState } from 'react'
import { getMediaRecommendations } from '../handlers/mediaHandler'

const GetRecommendations = ({ mediaId, mediaType }) => {
    const [recommendations, setRecommendations] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const loadMediaRecommendations = async () => {
        try {
            setError(null)
            const output = await getMediaRecommendations(mediaId, mediaType)
            setRecommendations(output)
        } catch (err) {
            console.error("Recommendations fetch error:", err)
            setError("Failed to load recommendations")
        }
    }

    useEffect(() => {
        if(mediaId && mediaType){
            setLoading(true)
            loadMediaRecommendations().finally(() => setLoading(false))
        }
    }, [mediaId, mediaType])


    if (loading) {
        return (
            <div className="w-full h-96 flex flex-col justify-center items-center ">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-gray-300">Loading Recommendations...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full h-20 flex flex-col justify-center items-center ">
                <p className="text-gray-300 italic">{error}</p>
            </div>
        )
    }

    if (!recommendations) {
        return null;
    }

    if(recommendations.length === 0){
        return (
            <div className="w-full h-20 flex flex-col justify-center items-center ">
                <p className=" text-lg
                font-normal">No Recommendations Found</p>
            </div>
        )
    }


    return (
        <div className='w-full min-h-100 overflow-y-auto handle-scroll py-5 flex justify-start items-start text-white'>
            {recommendations.map((rec) => (
                <a key={rec.id} href={`${process.env.NEXT_PUBLIC_URL}/${rec.media_type}/${rec.id}`} target='_blank' className='min-w-50 h-full flex flex-col gap-2 p-2 mr-5 border-0 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300'>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                        alt={rec?.original_title || rec.name}
                        className="rounded-lg h-70 object-contain hover:scale-102 transition-all duration-300 cursor-pointer"

                    />
                    <h3 className='text-lg font-semibold'>{rec.title || rec.name}</h3>

                </a>
            ))}


        </div>
    )
}

export default GetRecommendations


import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='bg-white border-b border-gray-100'>
            <div className='max-w-4xl mx-auto px-6 py-8'>
                <p className='text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4'>Browse by Category</p>
                <Carousel className="w-full">
                    <CarouselContent className='-ml-2'>
                        {category.map((cat, index) => (
                            <CarouselItem key={index} className="pl-2 basis-auto">
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className='rounded-full border-gray-200 text-gray-600 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 font-medium transition-all whitespace-nowrap px-5'
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='border-gray-200 hover:border-purple-300' />
                    <CarouselNext className='border-gray-200 hover:border-purple-300' />
                </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel

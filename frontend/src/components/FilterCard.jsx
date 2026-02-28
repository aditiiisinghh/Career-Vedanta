import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { SlidersHorizontal, X } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-5 LPA", "5-10 LPA", "10+ LPA"]
    }
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(prev => prev === value ? '' : value);
    };

    const clearAll = () => setSelectedValue('');

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-4'>
            {/* Header */}
            <div className='flex items-center justify-between p-5 border-b border-gray-50'>
                <div className='flex items-center gap-2'>
                    <div className='p-1.5 bg-purple-100 rounded-lg'>
                        <SlidersHorizontal size={14} className='text-purple-600' />
                    </div>
                    <h2 className='font-bold text-gray-900 text-sm'>Filters</h2>
                </div>
                {selectedValue && (
                    <button
                        onClick={clearAll}
                        className='flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium transition-colors'
                    >
                        <X size={12} /> Clear
                    </button>
                )}
            </div>

            {/* Filter Sections */}
            <div className='p-4 space-y-5'>
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h3 className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-3'>
                            {data.filterType}
                        </h3>
                        <div className='space-y-1'>
                            {data.array.map((item, idx) => {
                                const isSelected = selectedValue === item;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => changeHandler(item)}
                                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                            isSelected
                                                ? 'bg-purple-600 text-white shadow-sm shadow-purple-200'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        {item}
                                    </button>
                                );
                            })}
                        </div>
                        {index < filterData.length - 1 && (
                            <div className='mt-4 border-t border-gray-50'></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterCard;

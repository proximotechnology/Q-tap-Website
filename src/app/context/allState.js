import { useState } from 'react';
import { options } from '../categories/data';


const useSharedState = () => {
    const [phone, setPhone] = useState('');
    const [selectedTable, setSelectedTable] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [comment, setComment] = useState('');
    const [address, setAddress] = useState('');
    const [code, setCode] = useState('');
    const [selectedValue, setSelectedValue] = useState('cash');
    
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    const [selectedOption, setSelectedOption] = useState('dinein');

    const getTransformStyle = (optionValue) => {
        const angleMap = {
            delivery: 100,
            dinein: 180,
            takeaway: 260,
        };

        if (optionValue === selectedOption) {
            return `rotate(180deg) translateY(-120px)`;
        }

        if (optionValue === 'dinein') {
            return `rotate(${selectedOption === 'delivery' ? 100 : 260}deg) translateY(-120px)`;
        }

        return `rotate(${angleMap[optionValue]}deg) translateY(-120px)`;
    };
    
    const getSelectedOptionLabel = () => {
        const selected = options.find(option => option.value === selectedOption);
        return selected ? selected.label : '';
    };

    return {
        phone, setPhone,
        selectedTable, setSelectedTable,
        selectedCity, setSelectedCity,
        selectedName, setSelectedName,
        comment, setComment,
        address, setAddress,
        code, setCode,
        selectedValue, handleChange,
        selectedOption, setSelectedOption,
        getTransformStyle,
        getSelectedOptionLabel,
    };
};

export default useSharedState;



import React, { useEffect, useState } from 'react'
import './PhoneNumberInput.css'
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import Flag from 'react-world-flags' // Install this package for Country Flags
import countryCode from './CountryCode'; //Import JSON data which we have created


const PhoneNumberInput = () => {
    //Logic Part
    const [flag, setFlag] = useState('IR')
    const [dialCode, setDialCode] = useState('+' + 98)
    const [isActive, setIsActive] = useState(96)
    const [showDropDown, setShowDropDown] = useState(false)
    const [input, setInput] = useState('')
    const [filteredName, setFilteredName] = useState([])

    useEffect(() => {
       
        if (input === '') {
            setFilteredName(countryCode)
        }
        else {
            const filteredCountry = countryCode.filter(item => {
                const searchItem = input.toLowerCase();
                const prodName = item.name.toLowerCase();
                return prodName.startsWith(searchItem)

            })
            setFilteredName(filteredCountry)
        }
    }, [input]);






    return ( 
          <div className='phoneNumberContainer'>


              <div className={`phoneInputBox ${!showDropDown ? 'jeliBase' : ''}`}>


     <div onClick={() => setShowDropDown(false)} style={{width:'1200px',height:'1100px'
        ,margin:'-200px -400px',zIndex:'-2',position:'fixed'}}></div>

                <div className="flagContainer"
                    onClick={() => setShowDropDown(!showDropDown)}>
                        <div className="flagImg">
                        <Flag code={flag} />
                    </div>
                    <div className="arrowIcon">
                        <MdKeyboardArrowDown size={20} />
                    </div>
                </div>
                <div className="inputBoxContainer">
                    <p>Phone Number</p>
                    <div className="inputNumber">
                        <span>{dialCode}</span>
                        <input  type="number" />
                    </div>
                </div>
            </div>
            <div className={`flagDropDownBox ${!showDropDown ? 'd' : 'b'}`} style={{
                // opacity: !showDropDown ? "0" : "1",
                transition: "0.5s ease",
                visibility: !showDropDown ? "hidden" : "visible",
                // transform: !showDropDown ? "scale(0.9)" : "scale(1)",
                transformOrigin: "top",
            }}>
                <div className="countrySearch"
                
                style={{
                    
                    width: !showDropDown ? "0px" : "340px",
                    opacity: !showDropDown ? "0" : "1",
                    transition: !showDropDown ? ".4s" : "1.6s",
                }}
                >
                  <BiSearch size={25} />

                    <input type="text"
                        placeholder='Search for Countries'
                        value={input}
                        onChange={(e) => setInput(e.target.value)} />
                </div>

                <ul className='flagList'>
                    {
                        filteredName.map((flag, index) => {
                            return (
                                <li className={`flag 
                                ${isActive === index ? 'flagActive' : ''}`}
                                onClick={() => {
                                    setFlag(flag.code);
                                    setDialCode(flag.dial_code);
                                    setIsActive(index)
                                }}>
                                    <div className="flagImg">
                                        <Flag code={flag.code}
                                            fallback={<span>Unknown</span>} />
                                    </div>
                                    <div className="flagNames">
                                        <p className='flagName'>{flag.name}</p>
                                        <span>({flag.dial_code})</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
     
    )
}
export default PhoneNumberInput;





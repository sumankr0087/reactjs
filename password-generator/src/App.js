import './App.css';
import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (char) str += "~!@#$%^&*(){}_+?|[]`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, number, char, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, char, passwordGenerator])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [password]);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold">
        Password Generator
      </h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <div className='p-4'>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input
              type="text"
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='Password'
              readOnly
              ref={passwordRef} />
            <button
              onClick={copyPassword}
              className={`bg-blue-400 text-white p-2 ${copied ? 'bg-green-500' : ''
                }`}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className='flex text-sm gap-2'>
            <div className='flex items-center gap-1'>
              <input type="range"
                min={6}
                max={20}
                value={length}
                className='cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }} />
              <label>Length: {length}</label>
            </div>
            <div className='flex items-center gap-1'>
              <input type="checkbox"
                defaultChecked={number}
                id="numberInput"
                onChange={() => { setNumber((prev) => !prev) }} />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex items-center gap-1'>
              <input type="checkbox"
                defaultChecked={char}
                id="charInput"
                onChange={() => { setChar((prev) => !prev) }} />
              <label htmlFor='charInput'>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

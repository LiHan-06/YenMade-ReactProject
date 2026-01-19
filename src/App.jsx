//首頁
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import './index.css'

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* Section / Hero */}
      <div className='container-fluid p-0'>
        <img src="./src/assets/images/Hero_bg_pc.png" alt="Hero picture" className="w-100 d-block"/>
      </div>
    {/* Section / NewArrivals */}
    {/*Section / Features*/}
    {/*Section / Testimonials*/}
    {/* Section / FinalCTA */}
      <div className='container-fluid p-0'>
        <img src="./src/assets/images/FinalCTA_bg_img.jpg" alt="FinalCTA picture" className="w-100 d-block"/>
        <h2>買的不是食物</h2>
        <h2>是替日常留點餘裕</h2>
      </div>
    </>
  )
} 

export default App
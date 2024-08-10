import React from 'react'
import {Navbar} from './components/Navbar'
import { HeroSection } from './components/HeoSection'
import Feature from './components/FeatureSection'

const App = () => {
  return (
    <div className="bg-gray-900" >
      <Navbar/>
      <HeroSection/>
      <Feature/>
    </div>
  )
}

export default App
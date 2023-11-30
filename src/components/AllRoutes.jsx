import React from 'react'
import {Route,Routes} from "react-router-dom"
import Landing from './Landing'
import Dashboard from './Dashboard'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes
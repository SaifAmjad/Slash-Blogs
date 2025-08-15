import React from 'react'
import CTA from '../components/Home/CTA'
import RecentBlogs from '../components/Home/RecentBlogs'
import TodaysPick from '../components/Home/TodaysPick'
import PrimaryButton from '../components/UI/PrimaryButton'


const Home = () => {
  return (
    <div className='px-10'>
        <div className='h-[90vh]'>
            <CTA/>
        </div>

        <div className='px-10 mt-16'>
            <RecentBlogs/>

           
        </div>

        <div>
          <TodaysPick/>
        </div>



    </div>
  )
}

export default Home
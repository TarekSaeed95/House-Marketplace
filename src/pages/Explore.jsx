import { Link } from 'react-router-dom'
import image1 from '../assets/jpg/rentCategoryImage.jpg'
import image2 from '../assets/jpg/sellCategoryImage.jpg'
import ImageSlider from '../component/ImageSliderComponent'
function Explore() {
  return (
    <div className="explore py-8 min-h-screen	 ">
      <div className="container">
        <div className="head-text mb-4">
        <h2 className='head-title text-center text-violet-600 mb-8'>House Marketplace</h2>
        <h2 className='subhead-title text-primary'>Explore Ads</h2>
        </div>
              <ImageSlider/>

        <div className="categories  my-16">
          <div className="head font-bold text-2xl mb-8 text-secondary">
            Categories
          </div>
          <div className="bottom-area flex gap-8 flex-wrap">
            <Link className="rent overflow-hidden grow  " to='/category/rent'>
            <img src={image1} className="h-full rounded-2xl category-img image-fit w-full" alt="rent places" />
            <p className='badge badge-info mt-4 text-white'>Places for rent</p>
            </Link>
          <Link className="sale overflow-hidden grow"  to='/category/sale'>
            <img src={image2} className="h-full rounded-2xl category-img image-fit w-full" alt="sale places" />
            <p className='badge badge-info mt-4 text-white'>Places for sale</p>
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore

// import spinner from '../assets/svg/Eclipse-1s-200px.svg'
import {ReactComponent as Spinner} from  '../assets/svg/Eclipse-1s-200px.svg'
function LoaderComponent({mini}) {
  return (
    <div className={`min-h-screen ${mini&&'min-h-full'} spinner flex justify-center items-center`}>
      <Spinner/>
    </div>
  )
}

export default LoaderComponent
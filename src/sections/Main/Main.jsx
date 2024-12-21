
import './Main.css';

function Main(props) {
  return (
    <div className='main' ref={props.mainRef} >
      <div className='main-container'>
        {props.children}
      </div>
    </div>
  )
}

export default Main;
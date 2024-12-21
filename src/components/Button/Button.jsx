import './Button.css';
import { Context } from '../../App';
import { useContext} from 'react';

const Button = ({handleClickAction,movie,children}) => {
  // const [toogleButton,setToogleButton] = useState(props.children);

  const handleClick = () => {
    // if(content.lastIndexOf("+") !== -1) {
    //   setToogleButton(`${content.slice(0,content.length - 1)}-`);
    // }
    // else {
    //   setToogleButton(`${content.slice(0,content.length - 1)}+`);
    // }
    handleClickAction(movie);
    // props.action === 'favorite'? props.setAddedToFavorite(!props.addedToFavorite) : props.setAddedToWatchlist(!props.addedToWatchlist);
  }

  const user = useContext(Context);
  return (
    <button onClick={handleClick} className={!user? 'd-none' : 'button text-uppercase'}>
      {children}
      <span></span>
      <span></span>
    </button>
  )
}

export default Button

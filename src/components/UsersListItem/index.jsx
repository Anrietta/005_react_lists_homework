import { Component } from 'react';
import styles from './UsersListItem.module.css'
// import classNames from 'classnames'
import defaultProfileImage from '../../assets/images.jpeg'

class UsersListItem extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        hasUserImgErr: false,
      }
    }

    handleImgError = () => {
        if (!this.state.hasUserImgErr) {
            this.setState({hasUserImgErr: true});
        }
    }

    render() {

        {/*тут при деструктуризації user ще можна б додати значення по замовчуванню для кожного елемента на випадок якщо в когось не буде потрібних даних */}
        const {
            user: {id, firstName, lastName, age, gender, image, phone, company:{title}, isSelected},
            selectUser,
        } = this.props;

        const {hasUserImgErr} = this.state;
        // console.log(this.props);

        const imgSrc = hasUserImgErr ? defaultProfileImage : image;

        const itemInlineStyle = {
            backgroundColor: isSelected ? 'green' : 'transparent'
        }

        return (
            <li style={itemInlineStyle} onClick={()=> selectUser(id)}>
                <h2>{firstName} {lastName}</h2>
                <p>{age}</p>
                <p>{gender}</p>
                <img src = {imgSrc} alt = {`Profile image of ${firstName} ${lastName}`} onError = {this.handleImgError}></img>
                <p>{phone}</p>
                <p>{title}</p>
                <button>Delete</button>
            </li>
        );
    }
}



export default UsersListItem;
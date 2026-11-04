import { Component } from 'react';
// import styles from './UsersListItem.module.css'
// import classNames from 'classnames'
import { MdDelete } from "react-icons/md";
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
            user: {id, firstName, lastName, age, gender, image, phone, company:{name, title}, isSelected},
            selectUser,
            deleteUser,
        } = this.props;

        const {hasUserImgErr} = this.state;

        const imgSrc = hasUserImgErr ? defaultProfileImage : image;

        const itemInlineStyle = {
            backgroundColor: isSelected ? 'green' : 'transparent'
        }

        return (
            <li style={itemInlineStyle} onClick={()=> selectUser(id)}>
                {/*додати два обробника на одну подію можна викликаючи обидві в одному CB. Двічі onClick як атрибут на один елемент не можна вішати */}

                <h2>{firstName} {lastName} (age: {age})</h2>
                <p>{gender}</p>
                <img src = {imgSrc} alt = {`Profile image of ${firstName} ${lastName}`} onError = {this.handleImgError}/>
                <p>Phone: {phone}</p>
                <p>Position: {title} at "{name}"</p>
                <button onClick = {(e) => deleteUser(e, id)}><MdDelete /></button>
            </li>
        );
    }
}



export default UsersListItem;
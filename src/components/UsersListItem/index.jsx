import { Component } from 'react';
import styles from './UsersListItem.module.css'
import classNames from 'classnames'
import { MdDelete } from "react-icons/md";
import defaultProfileImage from '../../assets/images.jpeg'

class UsersListItem extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        hasUserImgErr: false,
      }
    }

    // componentDidMount() {
    //     const {gender} = this.props;

    //     if (gender === 'female') {
    //         this.setState({isMale: false})
    //     }
    // }

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

        const selectedItem = classNames(styles.usersCard, {
            [styles.selectedMale]: isSelected && gender === 'male',
            [styles.selectedFemale]: isSelected && gender === 'female',
        })
        return (
            <li className={selectedItem} onClick={()=> selectUser(id)}>
                {/*додати два обробника на одну подію можна викликаючи обидві в одному CB. Двічі onClick як атрибут на один елемент не можна вішати */}

                <h2 className={styles.usersCardHeader}>{firstName} {lastName}</h2>
                <span className={styles.usersCardAge}>(age: {age})</span>
                <img className={styles.usersCardImage} src = {imgSrc} alt = {`Profile image of ${firstName} ${lastName}`} onError = {this.handleImgError}/>
                <p className={styles.usersCardPhone}>Phone: {phone}</p>
                <p className={styles.usersCardPosition}>Position: {title} at "{name}"</p>
                <button className={styles.usersCardDeleteBtn} onClick = {(e) => deleteUser(e, id)}><MdDelete /></button>
            </li>
        );
    }
}



export default UsersListItem;
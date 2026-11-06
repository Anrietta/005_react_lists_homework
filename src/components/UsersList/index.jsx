import { Component } from 'react';
import style from './UsersList.module.css'
import UsersListItem from '../UsersListItem/index'

// const usersTemp = [
//     {
//         id: 1,
//         firstName: 'Test',
//         lastName: 'Testovich',
//         age: 31,
//         gender: 'male', 
//         image: 'https://dummyjson.com/icon/emmaj/128',
//         phone: '+91 759-776-1614',
//         company: {
//             title: 'Sales Manager'
//         }
//     }
// ]

class UsersList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         users: [],
         isFetching: false,
         error: null,
      }
    }

    componentDidMount() { 
        this.setState({isFetching: true});
        
        fetch('https://dummyjson.com/users?limit=10&select=id,firstName,lastName,age,gender,image,phone,company')
        .then(response => response.json())
        .then(({users}) => {
            const usersWithSelection = users.map(u => ({
                ...u, isSelected: false
            }))
            this.setState({users: usersWithSelection})
        })
        .catch(e => this.setState({error: e}))
        .finally(()=> this.setState({isFetching: false}));
    }

    selectUserClickHandler = (id) => {
        const {users} = this.state;
        const foundIndex = users.findIndex(u => u.id === id);

        const newUsers = [...users];
        newUsers[foundIndex] = {
            ...newUsers[foundIndex],
            isSelected: !newUsers[foundIndex].isSelected
        };

        // console.log(`${id} was clicked`);
        this.setState({users: newUsers})
    }

    deleteUserHandler = (e, id) => {
        e.stopPropagation();
        const {users} = this.state;
        const newUsers = users.filter(u => u.id !== id);

        this.setState({users: newUsers})
    }

    render() {
        const {users, isFetching, error} = this.state;

        return (
            <>
                {isFetching && <div>Loading! Please wait...</div>}

                {error && <div>!!!Error!!! {JSON.stringify(error.message)}</div>}

                {!isFetching && !error && (
                    <>
                        <h1 className={style.usersListHeader}>Users List: </h1>
                        <ul className={style.usersList}> 
                            {users.map(u => <UsersListItem 
                                key = {u.id} 
                                user = {u} 
                                selectUser = {this.selectUserClickHandler} 
                                deleteUser = {this.deleteUserHandler}
                                />
                            )}
                            
                        </ul>
                    </>
                )}

            </>
        );
    }
}


export default UsersList;
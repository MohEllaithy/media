import { useEffect } from "react";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import { useSelector } from "react-redux";
import useThunk from "../hooks/useThunk";
import UsersListItem from "./UsersListItem";

function UsersList(){
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreatingUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    useEffect(() => {
        doFetchUsers();
      }, [doFetchUsers]);

    const {data} = useSelector(state => state.users);

    const handleAddUser = (event) => {
        event.preventDefault();
        doCreatingUser();
    }

    let content;

    if (isLoadingUsers) content = <Skeleton times={6} className="h-10 w-full" />;

    if (loadingUsersError) content = <div>Error Fetching Data...</div>;

    const renderedUsers = data.map(user => <UsersListItem key={user.id} user={user}/>);

    return(
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button loading={isCreatingUser} onClick={handleAddUser}>+ Add User</Button>
                {creatingUserError && 'Error creating user...'}
            </div>
            <div>{content ? content : renderedUsers}</div>
        </div>
    );
}

export default UsersList;
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import { useEffect } from "react";
import Skeleton from "./Skeleton";

function UsersList(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
      }, [dispatch]);

    const {data, isLoading, error} = useSelector(state => state.users);

    const handleAddUser = (event) => {
        event.preventDefault();
        dispatch(addUser());
    }

    if (isLoading) return <Skeleton times={6} className="h-10 w-full" />;

    if (error) return <div>Error Fetching Data...</div>;

    const renderedUsers = data.map(user => {
        return <div key={user.id} className="mb-2 border rounded">
            <div className="flex p-2 justify-between items-center cursor-pointer">
                {user.name}
            </div>
        </div>
    });


    return(
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button onClick={handleAddUser}>+ Add User</Button>
            </div>
            <div>{renderedUsers}</div>
        </div>
    );
}

export default UsersList;
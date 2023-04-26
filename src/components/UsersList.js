import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import { useEffect } from "react";
import Skeleton from "./Skeleton";

function UsersList(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
      }, [dispatch]);

    const {data, isLoading, error} = useSelector(state => state.users);

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
        <div>{renderedUsers}</div>
    );
}

export default UsersList;
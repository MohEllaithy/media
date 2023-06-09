import { useFetchAlbumsQuery, useAddAlbumsMutation } from "../store";
import Skeleton from "../components/Skeleton";
import Button from "../components/Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({user}){
    const {data, error, isFetching} = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumsMutation();
    let content; 

    const handleClick = () => addAlbum(user);

    if (isFetching) {
        content = <Skeleton className="h-10 w-full" times={3} />
    } else if (error) {
        content = <div>Error loading albums.</div>;
    } else {
        content = data.map(album => <AlbumsListItem key={album.id} album={album} />);
}


    return(
        <div>
            <div className="m-2 flex flex-row item-center justify-between">
                <h3 className="text-lg font-bold">Albums for {user.name}</h3>
                <Button loading={results.isLoading} onClick={handleClick}>+ Add Album</Button>
            </div>
            <div>{content}</div>
        </div>
    );
}

export default AlbumsList;
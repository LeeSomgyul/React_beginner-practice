import { Link, Outlet, useParams } from "react-router-dom";
import { users } from "../../db";

function User () {
    const params = useParams();

    return(
        <div>
            <div>User id: {params.userId}</div>
            <div>User Name: {users[Number(params.userId)-1].name}</div>
            <hr/>
            <Link to="followers">{users[Number(params.userId)-1].name}님의 팔로워</Link>
            <Outlet/>
        </div>
    );
}

export default User;
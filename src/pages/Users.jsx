import { useEffect, useState } from "react";
import { getAllUsers } from "../Api/usersApi";
import Skelton from "../layout/Skelton";
import DeleteIcon from "../Icons/DeleteIcon";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  if(loading){
    <Skelton/>
  }

  return (
    <div>
       <div className="w-full">
        <table className="table text-2xl">
          {/* head */}
          <thead className="text-center text-black text-2xl">
            <tr>
              <th></th>
              <th className="text-start">Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Number</th>
              <th>Role</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Map through users and render each row */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>
                  <div>{index + 1}</div>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    {/* <div className="avatar">
                      <div className="mask mask-squircle h-16 w-16">
                        <img src={user.image} alt={user.name} />
                      </div>
                    </div> */}
                    <div>
                      <div className="font-bold capitalize">{user.name}</div>
                      <div className="text-sm opacity-50">
                        {user.createdAt}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center text-sm">{user.address}</td>
                <td className="w-32">
                  <div className="text-sm text-center">
                    {user.email}
                  </div>
                </td>
                <td></td>
                <td className="text-[19px] text-center">
                  {user.role}
                </td>
                <td></td>
                <td></td>
                <td>
                  <button>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;

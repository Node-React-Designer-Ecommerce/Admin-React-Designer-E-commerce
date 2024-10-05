import { useEffect, useState } from "react";
import { getAllUsers } from "../Api/usersApi";
import Skelton from "../layout/Skelton";

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

  return (
    <div>
      <h1 className="font-bold text-3xl mb-5 text-purpleColor ">Users</h1>
      <div>
        {loading ? (
          [...Array(10)].map((_, index) => <Skelton key={index} />)
        ) : (
          <div>
            {users.length === 0 ? (
              <p>No users found</p>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className="card bg-base-100 w-80 shadow-xl mb-6 rounded"
                >
                  <figure className="rounded-full w-36 h-36 mx-auto mt-12">
                    <img
                      className="rounded-full w-36 h-36"
                      src="/public/user.jpg"
                      alt={user.name}
                    />
                  </figure>
                  <div className="card-body mx-auto">
                    <h2 className="card-title">Name: {user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <div className="card-actions justify-end">
                      <button className="btn bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;

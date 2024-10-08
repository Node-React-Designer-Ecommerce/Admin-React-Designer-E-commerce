import { useEffect, useState } from "react";
import { getAllDesigns } from "../Utilities/Api/designsApi";
import Skelton from "../layout/Skelton";

export default function Designs() {
  const [designs, setdesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDesigns = async () => {
      try {
        setLoading(true);
        const data = await getAllDesigns();
        console.log(data);
        setdesigns(data);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    getDesigns();
  }, []);
  if(loading) {
    <Skelton/>
  }
  return (
    <div className="w-full">
      <div className="overflow-x-auto  max-w-full ">
        <table className="table w-full">
          {/* head */}
          <thead className="text-center text-2xl text-black">
            <tr>
              <th>Designs</th>
              <th>price</th>
              <th>Selected Images</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!designs ? (
              <tr>
                <td colSpan="3">No Designs</td>
              </tr>
            ) : (
              designs.map((design) => (
                <tr key={design._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="rounded h-44 w-44">
                          <img
                            className="w-44 h-44"
                            src={design.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-xl text-center">
                      {design.totalPrice}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      {/* Iterate over the dragImages array and render each image */}
                      {design.dragImages && design.dragImages.length > 0 ? (
                        design.dragImages.map((image, index) => (
                          <div key={index} className="avatar">
                            <div className=" rounded w-44 h-44 ">
                              <img
                                src={image}
                                alt={`Design Image ${index + 1}`}
                                style={{ width: "auto", height: "auto" }}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <span>No Images</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

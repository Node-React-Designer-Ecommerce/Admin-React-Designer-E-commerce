function Skelton() {
  return (
    <div className="overflow-x-auto">
    <div className="w-full">
      <table className="table text-2xl">
        <thead className="text-xl">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Quantity & Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Skeleton Rows */}
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td>
                <div className="skeleton h-10 w-10"></div>
              </td>
              <td>
                <div className="skeleton h-6 w-36"></div>
              </td>
              <td>
                <div className="skeleton h-6 w-20"></div>
              </td>
              <td>
                <div className="skeleton h-6 w-64"></div>
              </td>
              <td>
                <div className="skeleton h-6 w-48"></div>
              </td>
              <td>
                <div className="skeleton h-10 w-10"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Skelton
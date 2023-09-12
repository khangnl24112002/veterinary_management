/* eslint-disable react/prop-types */
const Card = ({ drug }) => {
  return (
    <div className="w-full md:w-64 bg-white rounded-lg flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      <img
        src={drug.imageUrl}
        alt="img"
        title="img"
        className="w-full h-auto object-cover rounded-t-lg"
      />
      <div className="w-full p-4 justify-start flex flex-col">
        <h4 className="border-b-2 text-3xl">{drug.name}</h4>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Properties</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              <td>{drug.type}</td>
            </tr>
            <tr>
              <td>Usage</td>
              <td>{drug.usage}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-row gap-4 shrink">
          <button
            value="button"
            className="shrink basis-1/2 my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500 rounded-lg"
          >
            View detail
          </button>
          <button
            value="button"
            className="shrink basis-1/2 my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

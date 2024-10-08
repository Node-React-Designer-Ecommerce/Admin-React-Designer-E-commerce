import { Line, Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

const Dashboard = () => {
  const chartData = {
    labels: [
      "plane",
      "helicopter",
      "boat",
      "train",
      "subway",
      "bus",
      "car",
      "moto",
      "bicycle",
      "horse",
      "skateboard",
      "others",
    ],
    datasets: [
      {
        label: "Norway",
        data: [300, 400, 500, 600, 700, 800, 500, 400, 300, 200, 100],
        borderColor: "orange",
        fill: false,
      },
      {
        label: "Germany",
        data: [500, 600, 700, 800, 900, 600, 500, 400, 300, 200, 150],
        borderColor: "yellow",
        fill: false,
      },
      {
        label: "US",
        data: [200, 300, 400, 500, 600, 700, 600, 500, 400, 300, 200],
        borderColor: "red",
        fill: false,
      },
      {
        label: "France",
        data: [300, 400, 500, 600, 700, 800, 700, 600, 500, 400, 300],
        borderColor: "lightbrown",
        fill: false,
      },
    ],
  };
  const yourLocation = {
    markerOffset: 15,
    name: "Your Location",
    coordinates: [-74.006, 40.7128], // قم بتحديث هذه القيم بخط العرض والطول الخاصين بك
  };

  // Data for Campaign Revenue (Doughnut Chart)
  const doughnutData = {
    labels: ["Germany", "France", "Spain"],
    datasets: [
      {
        label: "Revenue Generated",
        data: [48, 35, 17],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Data for Sales Quantity (Stacked Bar Chart)
  const salesData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Mansoura",
        data: [900, 1400, 1700, 1800, 2000],
        backgroundColor: "#81c784",
      },
      {
        label: "Bortsaid",
        data: [1000, 1500, 1600, 1700, 1900],
        backgroundColor: "#4fc3f7",
      },
      {
        label: "Egypt",
        data: [1100, 1200, 1400, 1500, 1709],
        backgroundColor: "#ffb74d",
      },
    ],
  };

  // World Map Section

  return (
    <div>
      <div className="p-6 h-screen w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">DASHBOARD</h1>
          <button className="btn btn-primary">Download Reports</button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
          {/* Emails Sent */}
          <div className="card shadow-lg p-4 w-full h-full">
            <h3 className="text-xl font-semibold">Emails Sent</h3>
            <p className="text-3xl">12,361</p>
            <p className="text-green-500">+14%</p>
          </div>
          {/* Sales Obtained */}
          <div className="card shadow-lg p-4 w-full h-full">
            <h3 className="text-xl font-semibold">Sales obtained</h3>
            <p className="text-3xl">431,225</p>
            <p className="text-blue-500">+21%</p>
          </div>
          {/* New Clients */}
          <div className="card shadow-lg p-4 w-full h-full">
            <h3 className="text-xl font-semibold">New Clients</h3>
            <p className="text-3xl">32,441</p>
            <p className="text-purple-500">+5%</p>
          </div>
          {/* Traffic Received */}
          <div className="card shadow-lg p-4 w-full h-full">
            <h3 className="text-xl font-semibold">Traffic Received</h3>
            <p className="text-3xl">1,325,134</p>
            <p className="text-orange-500">+43%</p>
          </div>
        </div>

        {/* New Section: Campaign Revenue, Sales Quantity, Map */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Campaign Revenue (Doughnut Chart) */}
          <div className="col-span-1 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-600 mb-4">
              Campaign
            </h2>
            <Doughnut data={doughnutData} />
            <p className="text-xl mt-4">$48,352 revenue generated</p>
            <p className="text-sm text-gray-600">
              Includes extra misc expenditures and costs
            </p>
          </div>

          {/* Sales Quantity (Bar Chart) */}
          <div className="col-span-1 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-600 mb-4">
              Sales Quantity
            </h2>
            <Bar data={salesData} />
          </div>

          {/* World Sales Map */}
          <div className="col-span-1 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-600 mb-4">
              Global Sales Distribution
            </h2>
            <ComposableMap>
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: { fill: "#D6D6DA", outline: "none" },
                          hover: { fill: "#F53", outline: "none" },
                          pressed: { fill: "#E42", outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {/* Add Marker for Your Location */}
                <Marker coordinates={yourLocation.coordinates}>
                  <circle r={8} fill="#F53" />
                  <text
                    textAnchor="middle"
                    y={yourLocation.markerOffset}
                    style={{ fontSize: 14, fill: "#000" }}
                  >
                    {yourLocation.name}
                  </text>
                </Marker>
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </div>

        {/* Revenue Generated and Transactions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full h-full">
          {/* Revenue Generated (Graph) */}
          <div className="col-span-1 lg:col-span-2 p-6 shadow-lg w-full h-full">
            <h2 className="text-xl font-semibold text-purple-600 mb-4">
              Revenue Generated
            </h2>
            <p className="text-2xl mb-4">$59,342.32</p>
            <Line data={chartData} />
          </div>

          {/* Recent Transactions */}
          <div className="col-span-1 p-6 shadow-lg w-full h-full">
            <h2 className="text-xl font-semibold text-purple-600 mb-4">
              Recent Transactions
            </h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-bold">01e4dsaewf</p>
                  <p className="text-sm">johndoe</p>
                </div>
                <span className="text-red-500">$43.91</span>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-bold">0315dsaef</p>
                  <p className="text-sm">jackdower</p>
                </div>
                <span className="text-red-500">$133.45</span>
              </li>
              {/* Add more transactions */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

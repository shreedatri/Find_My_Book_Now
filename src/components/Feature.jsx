import { FaSearch, FaShoppingCart, FaBookOpen, FaClock, FaUserCheck } from "react-icons/fa";

const features = [
  { icon: <FaSearch size={30} />, title: "One-Stop Book Search", desc: "Find books across multiple platforms in one place." },
  { icon: <FaShoppingCart size={30} />, title: "Compare Prices", desc: "Get buying links from Amazon & Flipkart to choose the best deal." },
  { icon: <FaBookOpen size={30} />, title: "Instant Book Previews", desc: "Read book samples using Google Books API before buying." },
  { icon: <FaClock size={30} />, title: "Time-Saving", desc: "Search once, get results from multiple sources instantly." },
  { icon: <FaUserCheck size={30} />, title: "No Signup Required", desc: "Search books without an account." },
];

export default function FeaturesSection() {
  return (
    <div className="bg-[url('../features_background.jpg')] bg-cover bg-center py-16 mt-3">
      <div className="bg-black bg-opacity-30 rounded-lg max-w-7xl mx-auto text-center px-5 py-3">
        <h2 className="text-4xl font-extrabold text-white mb-6">Why Choose 🕮 𝐅𝐢𝐧𝐝𝐌𝐲𝐁𝐨𝐨𝐤𝐍𝐨𝐰 ?</h2>
        <p className="text-lg text-gray-100 mb-12">Effortlessly search for books, compare prices, and access previews from various platforms, all in one place.</p>
        <div className="flex flexbox my-5 justify-center">
        <img className="rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        src='../featuresgif.gif' alt="Banner image" />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 relative">
          {features.map((feature, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-xl flex flex-col items-center text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
              <div className="text-blue-600 mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

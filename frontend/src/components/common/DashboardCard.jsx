const DashboardCard = ({ name, icon, price, bgColor }) => {

  return (
    <div
      className={`w-full lg:w-80  ${bgColor} rounded-2xl p-5 flex flex-col justify-between text-white shadow-lg`}
    >
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-1 rounded-full">{icon}</div>
        <h1 className="text-md font-semibold">{name}</h1>
      </div>
      <h1 className="text-2xl font-bold">{price}</h1>
    </div>
  );
};

export default DashboardCard;

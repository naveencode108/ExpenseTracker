import React, { useEffect, useState } from 'react';
import WeatherApp from '../common/Weather';
import DashboardCard from '../common/DashboardCard';
import { useSelector } from 'react-redux';
import { dashboardOverview } from '../../services/auth/authApi';
import { FaMoneyBillWave, FaShoppingCart, FaWallet } from 'react-icons/fa';
import {toast} from 'react-hot-toast'

const DashboardOverview = () => {
  const { token } = useSelector(state => state.auth);
  const [data, setData] = useState(null);

  const bgAndIcon = [
    { icon: <FaShoppingCart/>, bgColor: "bg-gradient-to-r from-blue-500 to-blue-300" },
    { icon: <FaMoneyBillWave/>, bgColor: "bg-gradient-to-r from-red-500 to-red-200" },
    { icon: <FaWallet/>, bgColor: "bg-gradient-to-r from-green-500 to-green-400" }
  ];
  let val = null;

  useEffect(() => {
    const fetchOverview = async () => {
      let res = await dashboardOverview(token);
      if (res?.data?.success) {
        setData(res.data.data);
      }
      else {
        toast.error(res?.message);
      }
    }
    fetchOverview();
  }, []);

  if (data) {
    val = data.map((item, index) => ({ ...item, ...bgAndIcon[index] }));
  }

  return (
    <div className="h-full px-2 bg-gray-200 flex-1 py-3">
      <div className="flex justify-between flex-wrap gap-4">
        {val && val?.map((item, index) => (
          <DashboardCard
          key={index}
          name={item.name}
          icon={item.icon}
          price={item.value}
          bgColor={item.bgColor}
          />
        ))}

      </div>
      <div className="mt-6 w-fit  ">
        <WeatherApp />
      </div>
    </div>
  );
};

export default DashboardOverview;

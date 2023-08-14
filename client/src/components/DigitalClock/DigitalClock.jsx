import { useState, useEffect } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="text-3xl">
        <span className="mr-2">{hours}</span>
        <span className="ml-2 mr-2">:</span>
        <span className="ml-2">{minutes}</span>
        <span className="ml-2 mr-2">:</span>
        <span>{seconds}</span>
      </div>
    </div>
  );
};

export default DigitalClock;

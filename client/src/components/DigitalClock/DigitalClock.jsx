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
    <div className="flex items-center justify-center">
      <div className="text-2xl">
        <span className="">{hours}</span>
        <span>:</span>
        <span className="">{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
    </div>
  );
};

export default DigitalClock;

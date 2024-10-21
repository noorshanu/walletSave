/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from 'react';

function CoinGreed() {
  const [rangeValue, setRangeValue] = useState<number>(20); // State to store the range value
  const rangeMeter = useRef<HTMLInputElement>(null); // Ref to range input
  const rangeShow = useRef<HTMLInputElement>(null); // Ref to display input
  const rangeClock = useRef<SVGPolygonElement>(null); // Ref to clock (polygon)

  useEffect(() => {
    // Function to handle range changes
    const rangeChange = () => {
      const rotateClock = rangeMeter.current ? Number(rangeMeter.current.value) : 0;

      if (rangeClock.current) {
        rangeClock.current.style.transform = `rotate(${(-90 + (rotateClock * 180) / 100)}deg)`;
      }
      if (rangeShow.current) {
        rangeShow.current.value = `${rotateClock}%`;
      }
      setRangeValue(rotateClock);
    };

    const rangeInput = rangeMeter.current;
    if (rangeInput) {
      rangeInput.addEventListener('input', rangeChange);
    }

    return () => {
      if (rangeInput) {
        rangeInput.removeEventListener('input', rangeChange);
      }
    };
  }, []);

  return (
    <>
      <div className=" ">
        <div className="rang">
          <div className="rang-title">
            <input
              className="rang-number"
              ref={rangeShow}
              type="text"
              value={`${rangeValue}%`}
              disabled
            />
          </div>
          <svg className="meter" width="280" height="150">
            <circle className="meter-left" r="96" cx="135" cy="142"></circle>
            <circle className="meter-center" r="96" cx="136" cy="142"></circle>
            <circle className="meter-right" r="96" cx="138" cy="142"></circle>
            <polygon
              className="meter-clock"
              ref={rangeClock}
              points="129,145 137,90 145,145"
            ></polygon>
            <circle className="meter-circle" r="10" cx="137" cy="145"></circle>
          </svg>
          {/* <input
            className="rang-slider"
            ref={rangeMeter}
            id="range"
            type="range"
            min="0"
            max="100"
            defaultValue={rangeValue}
          /> */}
        </div>
      </div>
    </>
  );
}

export default CoinGreed;

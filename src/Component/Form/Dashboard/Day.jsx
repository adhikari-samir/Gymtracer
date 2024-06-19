import React, { useState, useEffect } from "react";
import { Accordion } from "@mantine/core";
import axios from "axios";
import { IoBody } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";

const Day = () => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    fetchDays();
  }, []);

  const fetchDays = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:9000/api/v1/day/get-all-days",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data.data.days);
      setDays(response.data.data.days);
    } catch (error) {
      console.error("Error fetching days:", error);
    }
  };

  const dayItems = days?.map((item) => <div key={item.id}>{item.name}</div>);

  return (
    <Accordion defaultValue={1}>
      <Accordion.Item key={1} value={"1"}>
        <Accordion.Control icon={<LuCalendarDays size={20} />}>
          {"Days "}
        </Accordion.Control>
        <Accordion.Panel key={1}>
          <p className="text-xl mb-4">Available days:</p>
          {dayItems}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default Day;

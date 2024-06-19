import React, { useState, useEffect } from "react";
import { Accordion, ActionIcon, Button } from "@mantine/core";
import axios from "axios";
import Loading from "../Loading";
import { Notifications } from "@mantine/notifications";
import { IconAdjustments } from "@tabler/icons-react";
import { ImBin } from "react-icons/im";
import { IoBody } from "react-icons/io5";

const Bodypart = () => {
  const [groceries, setGroceries] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:9000/api/v1/body-part/get-all-body-parts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response data:", response.data);
      const bodyParts = response.data.data.bodyParts; // Accessing the bodyParts array
      setGroceries(bodyParts);
    } catch (error) {
      console.error("Error fetching groceries:", error);
    }
  };

  const data = groceries?.map((item) => (
    <div key={item.id} className="flex justify-between items-center gap-y-8">
      {item.name}
      <ActionIcon
        variant="light"
        aria-label="Settings"
        style={{ cursor: "pointer" }}
        onClick={() => handleButtonClicked(item.id)}
      >
        <ImBin color="red" size={15} />
      </ActionIcon>
    </div>
  ));

  const handleInputChange = (event) => {
    setExerciseName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:9000/api/v1/body-part/add-body-part",
        {
          name: exerciseName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Exercise added:", response.data);
      Notifications.show({
        title: "Input Added",
        message: "Exercise has been successfully added.",
        color: "green",
      });

      fetchGroceries(); // After adding exercise, fetch the updated list of body parts

      setExerciseName(""); // Clear input field after adding exercise
    } catch (error) {
      console.error("Error adding exercise:", error);
    } finally {
      setLoading(false); // Set loading back to false after data has been fetched
    }
  };

  const handleButtonClicked = async (itemId) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      const response = await axios.delete(
        `http://127.0.0.1:9000/api/v1/body-part/delete-body-part/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Exercise deleted:", response.data);
      Notifications.show({
        title: "Input Deleted",
        message: "Exercise has been successfully deleted.",
        color: "red",
      });
      fetchGroceries(); // After deleting exercise, fetch the updated list of body parts
    } catch (error) {
      console.error("Error deleting exercise:", error);
    } finally {
      setLoading(false); // Set loading back to false after data has been fetched
    }
  };

  return (
    <>
      <Accordion defaultValue={1} order={2}>
        <Accordion.Item key={1} value={"1"}>
          <Accordion.Control icon={<IoBody size={20} />}>
            {"Body Parts "}
          </Accordion.Control>
          <Accordion.Panel key={1}>
            <p className="text-xl mb-4">Add body part</p>

            <input
              type="text"
              placeholder="Add exercise"
              className="border border-solid border-gray-500 rounded-md p-1  mb-4 w-full"
              value={exerciseName}
              onChange={handleInputChange}
            />
            <br />
            <Button className="h-8 mb-4 w-full" onClick={handleSubmit}>
              Submit
            </Button>

            <p className="text-xl mb-4">Available body parts:</p>
            {data}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Loading loading={loading} />
    </>
  );
};

export default Bodypart;

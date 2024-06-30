import React, { useState, useEffect } from "react";
import { Accordion, Button, Autocomplete, ActionIcon } from "@mantine/core";
import axios from "axios";
import Loading from "../Loading";
import { Notifications } from "@mantine/notifications";
import { CgGym } from "react-icons/cg";
import { ImBin } from "react-icons/im";

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [bodyPartId, setBodyPartId] = useState("");
  const [bodyPartName, setBodyPartName] = useState("");
  const [loading, setLoading] = useState(false);
  const [bodyPartOptions, setBodyPartOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
    fetchBodyPartOptions();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const response = await axios.get(
        "http://127.0.0.1:9000/api/v1/workout/get-all-workouts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const workoutData = response.data.data.Workouts;
      setWorkouts(workoutData);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchBodyPartOptions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const response = await axios.get(
        "http://127.0.0.1:9000/api/v1/body-part/get-all-body-parts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const bodyPartOptionsData = response.data.data.bodyParts.map((part) => ({
        label: part.name,
        value: String(part.id),
      }));

      setBodyPartOptions(bodyPartOptionsData);
    } catch (error) {
      setError(error.message);
    }
  };

  const workoutdata = workouts?.map((item) => (
    <div key={item.id} className="flex justify-between items-center gap-y-8">
      {item.name} ({item.bodyPart.name})
      <ActionIcon
        variant="light"
        aria-label="Delete"
        style={{ cursor: "pointer" }}
        onClick={() => handleDelete(item.id)}
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
        throw new Error("Token not found in local storage");
      }

      if (!exerciseName || !bodyPartId) {
        throw new Error("Exercise name or body part ID is missing");
      }

      const response = await axios.post(
        "http://127.0.0.1:9000/api/v1/workout/add-workout",
        {
          name: exerciseName,
          bodyPartId: bodyPartId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Notifications.show({
        title: "Input Added",
        message: "Exercise has been successfully added.",
        color: "green",
      });

      fetchWorkouts();
      setExerciseName("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (workoutId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      const response = await axios.delete(
        `http://127.0.0.1:9000/api/v1/workout/delete-workout/${workoutId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("workout_delete", response.data);

      Notifications.show({
        title: "Input Deleted",
        message: "Workout has been successfully deleted.",
        color: "red",
      });

      fetchWorkouts();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Accordion defaultValue={1} order={2}>
        <Accordion.Item key={1} value={"1"}>
          <Accordion.Control icon={<CgGym size={20} />}>
            {"Workouts"}
          </Accordion.Control>
          <Accordion.Panel key={1}>
            <p className="text-xl mb-4">Add workout</p>

            <input
              type="text"
              placeholder="Add workout"
              className="border border-solid border-gray-500 rounded-md p-1 mb-4 w-full"
              value={exerciseName}
              onChange={handleInputChange}
            />

            <Autocomplete
              label="Body Part"
              placeholder="Select or enter body part"
              data={bodyPartOptions}
              value={bodyPartName}
              onChange={(value) => {
                const selectedBodyPart = bodyPartOptions.find(
                  (option) => option.label === value
                );
                if (selectedBodyPart) {
                  setBodyPartId(selectedBodyPart.value);
                  setBodyPartName(selectedBodyPart.label);
                } else {
                  setBodyPartId("");
                  setBodyPartName("");
                }
              }}
            />

            <Button className="h-8 mb-4 w-full" onClick={handleSubmit}>
              Submit
            </Button>

            <p className="text-xl mb-4">Available workouts:</p>
            {workoutdata}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Loading loading={loading} />
    </>
  );
};

export default Workout;

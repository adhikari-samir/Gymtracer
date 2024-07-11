import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal } from "@mantine/core";
import Loading from "../../Loading";
import { Checkbox } from "@mantine/core";

const Report = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [bodyParts, setBodyParts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBodyParts();
  }, []);

  const fetchBodyParts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://127.0.0.1:9000/api/v1/workout/get-all-workouts/body-part",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBodyParts(data.bodyPartWithWorkouts); // Ensure you are setting the correct data structure
      console.log("Fetched body parts:", data.bodyPartWithWorkouts);
    } catch (error) {
      console.error("Error fetching body parts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-10">
        <div className="flex flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Workout Report</h1>
          <Button onClick={open} color="red" variant="light">
            Add Exercise +
          </Button>
          <Modal opened={opened} onClose={close} title="Authentication">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non enim
              quaerat nisi. Excepturi enim laudantium deserunt quas libero
              reprehenderit vero quasi debitis unde! Magnam aspernatur rerum
              aliquam, ex itaque error.
            </p>
          </Modal>
        </div>
        <div>
          {bodyParts.length > 0 ? (
            bodyParts.map((bodyPart, index) => (
              <div key={index} className="bg-white rounded-lg p-4 mb-3">
                <h2 className="text-lg font-semibold mb-2">{bodyPart.name}</h2>
                <div className="flex gap-16">
                  {bodyPart.workouts.map((workout, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-100 rounded-md p-3  border border-r-red-400 w-48"
                    >
                      <div className="flex justify-between">
                        <p className="text-base">{workout.name}</p>
                        <Checkbox
                          defaultunChecked={false}
                          variant="outline"
                          color="red"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg">No workout data available.</p>
          )}
        </div>
      </div>
      <Loading loading={loading} />
    </>
  );
};

export default Report;

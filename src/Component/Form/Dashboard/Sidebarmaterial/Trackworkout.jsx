import React, { useState } from "react";
import { Button, ActionIcon } from "@mantine/core";
import { PillsInput, Pill } from "@mantine/core";
import { CiEdit } from "react-icons/ci";

import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const Report = () => {
  const [openedCustomize, { open: openCustomize, close: closeCustomize }] =
    useDisclosure(false);
  const [openedSettings, { open: openSettings, close: closeSettings }] =
    useDisclosure(false);

  const customizeModal = (
    <Modal opened={openedCustomize} onClose={closeCustomize} title="Customize">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Customize Your Workouts</h2>
        <p className="text-gray-700">
          Here you can customize your workout settings, such as choosing
          exercise types, setting goals, and tracking progress.
        </p>
        <ul className="mt-4">
          <li className="mb-2">Choose your preferred exercises.</li>
          <li className="mb-2">Set your workout goals.</li>
          <li className="mb-2">Track your progress over time.</li>
        </ul>
      </div>
    </Modal>
  );

  const settingsModal = (
    <Modal opened={openedSettings} onClose={closeSettings} title="Settings">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <p className="text-gray-700">
          Adjust your application settings here, including theme preferences,
          notification settings, and account management.
        </p>
        <ul className="mt-4">
          <li className="mb-2">Change your theme color.</li>
          <li className="mb-2">Manage your notifications.</li>
          <li className="mb-2">Update your account details.</li>
        </ul>
      </div>
    </Modal>
  );

  const settingsIcon = (
    <ActionIcon
      variant="light"
      aria-label="Settings"
      size="xs"
      color="red"
      onClick={openSettings}
    >
      <CiEdit />
    </ActionIcon>
  );

  return (
    <>
      <div className="shadow-2xl rounded-xl m-5">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-medium ml-9 mt-4">Workouts</h1>

          {settingsModal}

          <Button
            onClick={openCustomize}
            variant="light"
            color="red"
            className="mr-8 mt-6"
          >
            Customize
          </Button>
        </div>
        <div className="ml-9 mt-4 w-11/12">
          <PillsInput variant="unstyled" size="lg" label="Chest">
            <Pill.Group>
              <Pill>
                React
                <span className="ml-2">{settingsIcon}</span>{" "}
              </Pill>
              <Pill>
                Vue
                <span className="ml-2">{settingsIcon}</span>{" "}
              </Pill>
              <Pill>
                Svelte
                <span className="ml-2">{settingsIcon}</span>{" "}
              </Pill>
            </Pill.Group>
          </PillsInput>
        </div>
        <div className="ml-9 mt-4 w-11/12">
          <PillsInput variant="unstyled" size="lg" label="Leg">
            <Pill.Group>
              <Pill>
                React
                <span className="ml-2">{settingsIcon}</span>{" "}
              </Pill>
              <Pill>
                Vue
                <span className="ml-2">{settingsIcon}</span>{" "}
              </Pill>
              <Pill>
                Svelte
                <span className="ml-2">{settingsIcon}</span>{" "}
              </Pill>
            </Pill.Group>
          </PillsInput>
        </div>
        <div className="ml-9 mt-4 w-11/12">
          <PillsInput variant="unstyled" size="lg" label="Back">
            <Pill.Group>
              <Pill>
                React
                <span className="ml-2">{settingsIcon}</span>{" "}
              </Pill>
              <Pill>
                Vue
                <span className="ml-2">{settingsIcon}</span>{" "}
              </Pill>
              <Pill>
                Svelte
                <span className="ml-2">{settingsIcon}</span>{" "}
              </Pill>
            </Pill.Group>
          </PillsInput>
        </div>
        {customizeModal}
        <p className="mt-5">.</p>
      </div>
    </>
  );
};

export default Report;

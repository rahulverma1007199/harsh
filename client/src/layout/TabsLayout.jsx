import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ headings, components }) {
  return (
    <div className="w-full  py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex gap-5 space-x-1 px-5   p-1">
          <Tab
            key={"01"}
            className={({ selected }) =>
              classNames(
                "w-full  py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                selected
                  ? "bg-primaryBlue text-primaryWhite  shadow"
                  : "bg-primaryGray text-primaryBlack hover:bg-primaryBlue hover:text-white"
              )
            }
          >
            <h1>{headings[0]}</h1>
          </Tab>
          <Tab
            key={"02"}
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                selected
                  ? "bg-primaryBlue text-primary shadow"
                  : " bg-primaryGray text-primaryBlack hover:bg-primaryBlue hover:text-white"
              )
            }
          >
            <h1>{headings[1]}</h1>
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2 px-2">
          <Tab.Panel
            key={"00-2"}
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            {components[0]}
          </Tab.Panel>
          <Tab.Panel
            key={"00-1"}
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            {components[1]}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

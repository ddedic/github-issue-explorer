/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { IssueState } from '@/graphql/queries/issues';

const publishingOptions = [
  {
    title: 'All Issues',
    description: 'Display all Issues',
    current: false,
    value: IssueState.ALL,
  },
  {
    title: 'Open Issues',
    description: 'Display only opened issues',
    current: true,
    value: IssueState.OPEN,
  },
  {
    title: 'Closed Issues',
    description: 'Display only closes issues',
    current: false,
    value: IssueState.CLOSED,
  },
];
interface StateDropdownProps {
  state: IssueState;
  onSelect(state: IssueState): void;
}

const StateDropdown: React.FC<StateDropdownProps> = ({ state, onSelect }: StateDropdownProps) => {
  const selected = publishingOptions.find(option => option.value === state);
  return (
    <Listbox value={selected} onChange={(i: any) => onSelect(i.value)}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change published status</Listbox.Label>
          <div className="relative">
            <div className="inline-flex shadow-sm rounded-md divide-x divide-gray-600">
              <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-gray-600">
                <div className="relative inline-flex items-center bg-gray-500 py-3 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm font-medium">{selected?.title}</p>
                </div>
                <Listbox.Button className="relative inline-flex items-center bg-gray-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500">
                  <span className="sr-only">Change issues state</span>
                  <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Listbox.Options
                static
                className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {publishingOptions.map(option => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-gray-500' : 'text-gray-900',
                        'cursor-default select-none relative p-4 text-sm'
                      )
                    }
                    value={option}>
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p className={selected ? 'font-semibold' : 'font-normal'}>
                            {option.title}
                          </p>
                          {selected ? (
                            <span className={active ? 'text-white' : 'text-gray-500'}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                        <p
                          className={classNames(
                            active ? 'text-gray-200' : 'text-gray-500',
                            'mt-2'
                          )}>
                          {option.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default StateDropdown;

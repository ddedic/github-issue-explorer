import * as React from 'react';
import { Loader } from '@/components/loader';
import { SearchIcon } from '@heroicons/react/solid';
import { IssueState } from '@/graphql/queries/issues';
import StateDropdown from './StateDropdown';

interface SearchToolbarProps {
  loading: boolean;
  state: IssueState;
  keyword?: string | null;
  onSelectState(state: IssueState): void;
  onChangeKeyword(e: React.FormEvent<HTMLInputElement>): void;
}

const SearchToolbar: React.FC<SearchToolbarProps> = ({
  loading,
  state,
  onSelectState,
  keyword,
  onChangeKeyword,
}: SearchToolbarProps) => {
  return (
    <div className="flex flex-1 mb-2">
      <div className="left flex flex-1 py-3">
        <div className="mt-1 flex-1 relative rounded-md shadow-sm">
          <input
            type="text"
            name="query"
            id="query"
            defaultValue={keyword ?? ''}
            onChange={onChangeKeyword}
            placeholder="Search"
            className="focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 sm:text-md border-gray-300 rounded-md px-4 py-3"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
        <div className="flex w-16 items-center justify-center ml-4">
          {loading && <Loader className="w-10" />}
        </div>
      </div>
      <div className="right flex flex-1 items-center justify-end ml-2 md:ml-36">
        <StateDropdown state={state} onSelect={(s: IssueState) => onSelectState(s)} />
      </div>
    </div>
  );
};

export default SearchToolbar;

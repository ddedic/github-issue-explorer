import Link from 'next/link';
import { InformationCircleIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Pagination from './Pagination';
import Issue from './Issue';

interface IssueListProps {
  loading: boolean;
  issues?: [any];
  meta?: any;
  onNext(): void;
  onPrevious(): void;
}

const IssueList: React.FC<IssueListProps> = ({
  loading,
  issues,
  meta,
  onNext,
  onPrevious,
}: IssueListProps) => {
  if (!loading && (!issues || !issues.length)) {
    return (
      <div className="h-64 overflow-hidden bg-white shadow rounded-md items-center justify-center">
        <div className="flex flex-col flex-1 h-64 items-center justify-center text-gray-300 ">
          <InformationCircleIcon className="text-gray-300 h-32" />
          No issues found
        </div>
      </div>
    );
  }

  return (
    <div className={classNames('flex flex-col flex-1', loading ? 'opacity-70' : '')}>
      <div className="flex flex-1 bg-white shadow sm:rounded-md">
        <ul className="flex flex-col flex-1 divide-y divide-gray-200">
          {issues &&
            issues.map(issue => (
              <li key={issue.id}>
                <Link href={`issue/${issue.number}`}>
                  <a href="#" className="block hover:bg-gray-50 ">
                    <Issue loading={loading} issue={issue} />
                  </a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <Pagination
        totalCount={meta?.totalCount}
        hasNextPage={meta?.hasNextPage}
        hasPreviousPage={meta?.hasPreviousPage}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </div>
  );
};

export default IssueList;

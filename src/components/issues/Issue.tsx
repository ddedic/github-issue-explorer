import Img from 'next/image';
import { ChatIcon, InformationCircleIcon } from '@heroicons/react/solid';
import { IssueState } from '@/graphql/queries/issues';
import classNames from 'classnames';
import dayjs from 'dayjs';

interface IssueProps {
  loading: boolean;
  issue?: any;
  asTitle?: boolean;
}

const Issue: React.FC<IssueProps> = ({ issue, asTitle = false }: IssueProps) => {
  return (
    <div className="flex flex-col flex-1 px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <p
          className={classNames(
            'text-lg font-medium text-gray-600',
            asTitle ? 'text-3xl' : 'text-lg'
          )}>
          {issue.title}
        </p>
        <div className="ml-2 flex-shrink-0 flex">
          <p
            className={classNames(
              'px-4 py-1 inline-flex text-sm leading-5 font-semibold rounded-full',
              issue?.state === IssueState.OPEN.toUpperCase()
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            )}>
            {issue.state}
          </p>
        </div>
      </div>
      <div className="mt-2 sm:flex sm:justify-between">
        <div className="sm:flex">
          <p className="flex items-center text-sm text-gray-500">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              #{issue.number}
            </span>
          </p>
          <div className="mt-2 flex items-center text-xs text-gray-500 sm:mt-0 sm:ml-6">
            by
            <span className="pl-2 pr-1">
              {issue?.author?.avatarUrl && (
                <Img
                  className="inline-block h-6 w-6 rounded-full border-white bg-gray-100"
                  width="24"
                  height="24"
                  src={issue?.author?.avatarUrl}
                  alt=""
                />
              )}
            </span>
            <span className="font-bold mr-1">{issue?.author?.login}</span>
            <time dateTime={issue.createdAt}>
              on {dayjs(issue.createdAt).format('DD.MM.YYYY @ H:m:ss')}
            </time>
          </div>
          <div className="flex items-center text-xs text-gray-500  sm:mt-0 sm:ml-6">
            {issue.labels.edges.map((edge: any) => (
              <span
                key={edge.node.id}
                className="px-2 py-0.5 rounded mr-1 text-gray-800"
                style={{ backgroundColor: `#${edge.node.color}` }}>
                {edge.node.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
          <ChatIcon className="flex-shrink-0 mr-1.5 h-6 w-6 text-gray-400" aria-hidden="true" />
          <p className="text-md">{issue.totalComments.count}</p>
        </div>
      </div>
    </div>
  );
};

export default Issue;

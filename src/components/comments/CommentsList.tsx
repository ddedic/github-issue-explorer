import { InformationCircleIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Comment from './Comment';

interface CommentsListProps {
  loading: boolean;
  comments?: [any];
  meta?: any;
}

const CommentsList: React.FC<CommentsListProps> = ({
  loading,
  comments,
  meta,
}: CommentsListProps) => {
  if (!loading && (!comments || !comments.length)) {
    return (
      <div className="h-48 flex flex-1 bg-gray-100 rounded-md items-center justify-center">
        <div className="flex flex-col flex-1 h-32 items-center justify-center text-gray-400 text-sm">
          <InformationCircleIcon className="text-gray-300 h-32" />
          Nobody has anything to say about this issue :(
        </div>
      </div>
    );
  }
  return (
    <div className={classNames('flex flex-col flex-1', loading ? 'opacity-70' : '')}>
      <div className="antialiased">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
        <div className="space-y-4"></div>
        {comments &&
          comments.map(comment => <Comment key={comment.id} loading={loading} comment={comment} />)}
      </div>
    </div>
  );
};

export default CommentsList;

import Img from 'next/image';
import dayjs from 'dayjs';

interface CommentProps {
  loading: boolean;
  comment?: any;
}

const Comment: React.FC<CommentProps> = ({ comment }: CommentProps) => {
  return (
    <div className="flex mb-8">
      <div className="flex-shrink-0 mr-3">
        {comment?.author?.avatarUrl && (
          <Img
            className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
            width="50"
            height="50"
            src={comment?.author?.avatarUrl}
            alt=""
          />
        )}
      </div>
      <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4  leading-relaxed bg-gray-50">
        <strong>{comment?.author?.login}</strong>{' '}
        <span className="text-xs text-gray-400">
          on {dayjs(comment?.createdAt).format('DD.MM.YYYY @ H:m:ss')}
        </span>
        <div className="text-sm" dangerouslySetInnerHTML={{ __html: comment?.bodyHTML }}></div>
      </div>
    </div>
  );
};

export default Comment;

import { useRouter } from 'next/router';
import { Header } from '@/components/layout';
import { useCurrentUser } from '@/graphql/queries/user';
import { useActiveRepository } from '@/graphql/queries/activeRepository';
import { updateActiveRepository } from '@/graphql/mutations/activeRepository';
import { useRepository } from '@/graphql/queries/repository';
import { useIssue } from '@/graphql/queries/issue';
import { ExclamationIcon } from '@heroicons/react/solid';
import { Issue } from '@/components/issues';
import { CommentsList } from '@/components/comments';

interface IssuePageProps {}

const IssuePage: React.FC<IssuePageProps> = ({}: IssuePageProps) => {
  const router = useRouter();
  const number = parseInt(router.query.number as string, 10);

  const { user } = useCurrentUser();
  const { activeRepository } = useActiveRepository();
  const { repository } = useRepository(activeRepository.owner, activeRepository.name);

  const {
    loading: loadingIssue,
    error,
    issue,
    comments,
  } = useIssue(activeRepository.owner, activeRepository.name, number);

  async function onChangeRepo(owner: string, name: string) {
    const repo = {
      __typename: 'ActiveRepository',
      id: `${owner}-${name}-id`,
      owner,
      name,
    };
    const result = await updateActiveRepository(repo);
    console.log('Result', result);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} repository={repository} onChangeRepo={onChangeRepo} />
      <div className="content flex flex-1">
        <div className="inner flex flex-col flex-1 my-12 px-4 md:px-8 max-w-7xl mx-auto">
          {error && (
            <div className="flex flex-col items-center justify-center p-8 h-screen bg-red-100 text-red-500">
              <ExclamationIcon className="h-16" />
              {error.message}
            </div>
          )}
          {issue && (
            <div className="bg-white p-6 rounded-md shadow">
              <div className="flex  sm:rounded-md">
                <Issue loading={loadingIssue} issue={issue} asTitle={true} />
              </div>
              <div className="flex mt-12">
                <CommentsList loading={loadingIssue} comments={comments} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssuePage;

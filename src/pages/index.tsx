import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useCurrentUser } from '@/graphql/queries/user';
import { useActiveRepository } from '@/graphql/queries/activeRepository';
import { updateActiveRepository } from '@/graphql/mutations/activeRepository';
import { useRepository } from '@/graphql/queries/repository';
import { useIssues, IssueState } from '@/graphql/queries/issues';
import { Header } from '@/components/layout';
import { IssuesList, SearchToolbar } from '@/components/issues';

export default function Home(): JSX.Element {
  const [issueState, setIssueState] = useState(IssueState.OPEN);
  const [keyword, setKeyword] = useState(null);
  const [cursor, setCursor] = useState(null);

  const { user } = useCurrentUser();
  const { activeRepository } = useActiveRepository();
  const { repository } = useRepository(activeRepository.owner, activeRepository.name);
  const {
    loading: loadingIssues,
    issues,
    meta,
  } = useIssues(repository?.nameWithOwner, issueState, keyword, cursor);

  function onNext() {
    if (meta) {
      setCursor(meta.endCursor);
      window.scrollTo(0, 0);
    }
  }

  function onPrevious() {
    console.log('Implement onPrevious...');
  }

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

  const debounceKeyword = useDebouncedCallback(value => {
    setKeyword(value);
  }, 650);

  useEffect(() => {
    console.log('Repository changed. Reset local state...');
    setCursor(null);
    setKeyword(null);
    setIssueState(IssueState.OPEN);
  }, [repository?.id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} repository={repository} onChangeRepo={onChangeRepo} />
      <div className="content flex flex-1">
        <div className="inner flex flex-col flex-1 my-12 px-4 md:px-8 max-w-7xl mx-auto">
          <SearchToolbar
            loading={loadingIssues}
            state={issueState}
            onSelectState={(state: IssueState) => setIssueState(state)}
            keyword={keyword}
            onChangeKeyword={(e: React.FormEvent<HTMLInputElement>) =>
              debounceKeyword(e.currentTarget.value)
            }
          />
          <IssuesList
            loading={loadingIssues}
            issues={issues}
            meta={meta}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        </div>
      </div>
    </div>
  );
}

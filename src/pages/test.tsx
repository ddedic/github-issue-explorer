import React from 'react';
import Head from 'next/head';
import { useCurrentUser } from '@/graphql/queries/user';
import { useActiveRepository } from '@/graphql/queries/activeRepository';
import { useRepository } from '@/graphql/queries/repository';
import { updateActiveRepository } from '@/graphql/mutations/activeRepository';
import { useIssues } from '@/graphql/queries/issues';

export default function Home(): JSX.Element {
  const { loading: loadingUser, user } = useCurrentUser();
  const { loading: loadingActiveRepository, activeRepository } = useActiveRepository();
  const { loading: loadingRepository, repository } = useRepository(
    activeRepository.owner,
    activeRepository.name
  );
  const { loading: loadingIssues, meta, issues } = useIssues(repository?.nameWithOwner);

  // console.log('user PROPS', { loadingUser, user });
  // console.log('repo PROP', { loadingActiveRepository, activeRepository });

  async function setReact() {
    const repo = {
      __typename: 'ActiveRepository',
      id: 'MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==',
      owner: 'facebook',
      name: 'react',
    };
    const result = await updateActiveRepository(repo);
    console.log('Result', result);
  }

  async function setVueJs() {
    const repo = {
      __typename: 'ActiveRepository',
      id: 'MDEwOlJlcG9zaXRvcnkxMTczMDM0Mg==',
      owner: 'ddedic',
      name: 'nexsell',
    };
    const result = await updateActiveRepository(repo);
    console.log('Result', result);
  }

  return (
    <div className="h-screen bg-gray-100">
      <Head>
        <title>GitHub Explorer</title>
        <meta name="description" content="Github GraphQL demonstration app using React" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto p-4">
        <div className="flex flex-1">
          <div className="flex flex-col flex-1 items-start">
            <h1>{user && <span>{user.login}</span>}</h1>

            <div className="flex  mt-6">
              <pre className="text-xs">{JSON.stringify(activeRepository, null, 2)}</pre>
            </div>

            <div className="flex  mt-6">
              <pre className="text-xs">{JSON.stringify(repository, null, 2)}</pre>
            </div>

            <div className="flex mt-3">
              <a onClick={setReact} className="bg-red-500 hover:bg-red-600 cursor-pointer p-6">
                Set React
              </a>

              <a onClick={setVueJs} className="bg-red-500 hover:bg-red-600 cursor-pointer p-6 ml-2">
                Set VueJS
              </a>
            </div>
          </div>

          <div className="flex flex-1 bg-white">
            <div className="relative verflow-y-auto">
              {loadingIssues && <div className="bg-red-200">LOADING...</div>}
              {issues ? (
                <pre className="text-xs">{JSON.stringify(issues, null, 2)}</pre>
              ) : (
                <div className="flex flex-1 items-center justify-center">No issues at all!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Head from 'next/head';
import Img from 'next/image';
import Link from 'next/link';
import { StarIcon, ShareIcon, ExclamationIcon } from '@heroicons/react/solid';
import GitHubLogo from './GitHubLogo';

interface HeaderProps {
  user: any;
  repository: any;
  onChangeRepo(owner: string, name: string): void;
}

const Header: React.FC<HeaderProps> = ({ user, repository, onChangeRepo }: HeaderProps) => {
  return (
    <>
      <Head>
        <title>
          {repository?.nameWithOwner
            ? `${repository?.nameWithOwner} - GitHub Issue Explorer`
            : 'GitHub Issue Explorer'}
        </title>
        <meta name="description" content="Github GraphQL demonstration app using React" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-100">
        <div className="flex overflow-hidden h-10 w-full lg:h-10 bg-gray-200">
          <div className="flex flex-1 px-8 max-w-7xl mx-auto items-center">
            <span className="flex flex-1 text-sm text-bold ">
              <a
                className="text-gray-400 hover:text-gray-500"
                href="https://github.com/ddedic/github-issue-explorer"
                target="_blank"
                rel="noreferrer">
                {user?.login} @ GitHub Issue Explorer
              </a>
            </span>
            <span className="flex">
              <a
                className="text-sm text-gray-400 hover:text-gray-500 mr-3 inline-block"
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onChangeRepo('facebook', 'react');
                }}>
                React
              </a>

              <a
                className="text-sm text-gray-400 hover:text-gray-500 mr-3"
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onChangeRepo('apollographql', 'apollo-client');
                }}>
                Apollo Client
              </a>
              <a
                className="text-sm text-gray-400 hover:text-gray-500 mr-3"
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onChangeRepo('vuejs', 'vue');
                }}>
                Vue.js
              </a>
            </span>
          </div>
        </div>
        <div className="flex overflow-hidden h-32 w-full lg:h-48 ">
          <div className="flex flex-1 px-8 max-w-7xl mx-auto items-center">
            <div className="flex flex-1">
              <div className="image relative overflow-hidden h-24 w-24 rounded-full ring-4 ring-white hover:ring-gray-200 sm:h-32 sm:w-32 mr-4 items-center">
                {repository?.openGraphImageUrl && (
                  <Link href="/">
                    <a href="#">
                      <Img layout="fill" className="" src={repository?.openGraphImageUrl} alt="" />
                    </a>
                  </Link>
                )}
              </div>
              <div className="title flex-col flex flex-1  justify-center">
                <h1 className="text-4xl font-bold text-gray-900">{repository?.nameWithOwner}</h1>
                <h2 className="text-sm md:text-xl text-gray-500 truncate">
                  {repository?.description}
                </h2>
                <ul className="flex flex-row mt-2 ">
                  <li className="flex bg-white text-gray-600 h-10 px-2 rounded-lg items-center justify-center mr-3">
                    <StarIcon className="h-6 mr-1" />
                    {repository?.stargazerCount}
                  </li>
                  <li className="flex bg-white text-gray-600 h-10 px-2 rounded-lg items-center justify-center mr-3">
                    <ShareIcon className="h-6 mr-1" />
                    {repository?.forkCount}
                  </li>
                  <li className="flex bg-white text-gray-600 text-md h-10 px-2 rounded-lg items-center justify-center mr-3">
                    <ExclamationIcon className="h-6 mr-1" />
                    {repository?.issues?.totalCount}
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex relative">
              <GitHubLogo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

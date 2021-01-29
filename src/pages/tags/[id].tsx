import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import Layout from '../../components/layout';
import {
  getAllPosts,
  getAuthorData,
  getAllTags,
  getLocalResources,
} from '../../../lib/api';
import PageHeader from '../../components/page-header';
import Head from 'next/head';
import { URL_BASE, WEB_NAME } from '../../../lib/constants';
import PostType from '../../../types/post';
import Author from '../../../types/author';
import PostsList from '../../components/posts-list';
import { getTagTitle } from '../../../lib/tag-helpers';
import ILocalResources from '../../interfaces/ilocalresources';

type Props = {
  author: Author;
  tagTitle: string;
  postsByTag: PostType[];
  localResources: ILocalResources;
};

const Tag = ({ author, tagTitle, postsByTag, localResources }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !tagTitle) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout author={author} localResources={localResources}>
      <Container>
        <PageHeader>
          {localResources.posts_by_tag} - {tagTitle}
        </PageHeader>
        {router.isFallback ? (
          <PageHeader>{localResources.loading}</PageHeader>
        ) : (
          <>
            <Head>
              <title>
                {tagTitle} - {WEB_NAME}
              </title>

              <meta
                property="description"
                content={`${localResources.posts_by_tag} - ${tagTitle}`}
              />
              <meta
                property="author"
                content={`${author.firstname} ${author.lastname}`}
              />
              <meta name="keywords" content={tagTitle} />
              <meta name="date" content={new Date().toLocaleDateString()} />

              <meta property="og:url" content={`${URL_BASE}${router.asPath}`} />
              <meta property="og:type" content="website" />
              <meta property="og:title" content={`${tagTitle} - ${WEB_NAME}`} />
              <meta
                property="og:description"
                content={`${localResources.posts_by_tag} - ${tagTitle}`}
              />
              <meta property="og:image" content={author.picture} />
            </Head>
            <PostsList
              posts={postsByTag}
              actualPage={1}
              localResources={localResources}
            />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Tag;

type Params = {
  params: {
    id: string;
    page: number;
  };
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export const getStaticProps = async ({ params, locale }: Params) => {
  const author = getAuthorData(locale);
  const localResources = await getLocalResources(locale);

  const allPosts = getAllPosts(locale, [
    'title',
    'date',
    'slug',
    'excerpt',
    'tags',
  ]);

  const postsByTag = allPosts.filter((p) => p.tags.includes(params.id));

  const tagTitle = getTagTitle(params.id);

  return {
    props: {
      author,
      tagTitle,
      postsByTag,
      localResources: localResources.default,
    },
  };
};

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const paths: { locale: string; params: { id: string } }[] = [];

  locales.forEach((locale) => {
    const allTags = getAllTags(locale);
    const paginatedPostsByTags: {
      tag: string;
      locale: string;
    }[] = [];

    allTags.forEach((tag) => {
      paginatedPostsByTags.push({ tag, locale });
    });

    const pagePath = paginatedPostsByTags.map((pt) => {
      return {
        locale: pt.locale,
        params: {
          id: pt.tag,
        },
      };
    });

    paths.push(...pagePath);
  });

  return {
    paths: paths,
    fallback: false,
  };
}
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import Layout from '../../components/layout';
import {
  getLocalizedAuthor,
  getLocalizedPosts,
  getLocalizedTags,
} from '../../lib/api';
import PageHeader from '../../components/page-header';
import Head from 'next/head';
import { URL_BASE, WEB_NAME } from '../../lib/constants';
import PostType from '../../types/post';
import Author from '../../types/author';
import PostsList from '../../components/posts-list';
import { getTagTitle } from '../../lib/tag-helpers';
import { PostTag } from '../../enums/postTag';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../../enums/translationResource';

type Props = {
  author: Author;
  tagTitle: string;
  posts: PostType[];
};

const Tag = ({ author, tagTitle, posts }: Props) => {
  const router = useRouter();
  const { t, lang } = useTranslation('common');

  if (!router.isFallback && !tagTitle) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout author={author}>
      <Container>
        <PageHeader>
          {t(TranslationResource.posts_by_tag)} - {tagTitle}
        </PageHeader>
        {router.isFallback ? (
          <PageHeader>{t(TranslationResource.loading)}</PageHeader>
        ) : (
          <>
            <Head>
              <title>
                {tagTitle} - {WEB_NAME}
              </title>

              <meta
                property="description"
                content={`${t(TranslationResource.posts_by_tag)} - ${tagTitle}`}
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
                content={`${t(TranslationResource.posts_by_tag)} - ${tagTitle}`}
              />
              <meta property="og:image" content={author.picture} />
            </Head>
            <PostsList posts={posts} actualPage={1} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Tag;

type Params = {
  params: {
    id: PostTag;
    page: number;
  };
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export const getStaticProps = async ({ params, locale }: Params) => {
  const author = await getLocalizedAuthor(locale);
  const posts = (await getLocalizedPosts(locale)).filter((p) =>
    p.tags.includes(params.id),
  );

  const tagTitle = getTagTitle(params.id);

  return {
    props: {
      author,
      tagTitle,
      posts,
    },
  };
};

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const paths: {
    locale: string;
    params: { id: PostTag };
  }[] = (
    await Promise.all(
      locales.map(async (locale) => {
        const allTags = await getLocalizedTags(locale);

        return allTags.map((tag) => {
          return {
            locale: locale,
            params: {
              id: tag,
            },
          };
        });
      }),
    )
  ).flat();

  return {
    paths: paths,
    fallback: false,
  };
}

import { ISbStoriesParams, ISbStoryData, useStoryblokState } from '@storyblok/react';
import { GetStaticPathsContext, GetStaticPropsContext, NextPage } from 'next';
import NoDataAvailable from '../../../components/common/NoDataAvailable';
import StoryblokSessionPage, {
  StoryblokSessionPageProps,
} from '../../../components/storyblok/StoryblokSessionPage';
import { getStoryblokPageProps } from '../../../utils/getStoryblokPageProps';
import { getStoryblokPaths } from '../../../utils/storyBlogHelper';

interface Props {
  story: ISbStoryData | null;
}

const SessionDetail: NextPage<Props> = ({ story }) => {
  story = useStoryblokState(story);

  if (!story) {
    return <NoDataAvailable />;
  }

  return (
    <StoryblokSessionPage
      {...(story.content as StoryblokSessionPageProps)}
      storyId={story.id}
      storyUuid={story.uuid}
      storyPosition={story.position}
    />
  );
};

export async function getStaticProps({ locale, preview = false, params }: GetStaticPropsContext) {
  const slug = params?.slug instanceof Array ? params.slug.join('/') : params?.slug;
  const sessionSlug =
    params?.sessionSlug instanceof Array ? params.sessionSlug.join('/') : params?.sessionSlug;
  const fullSlug = `courses/${slug}/${sessionSlug}`;

  const storyblokProps = await getStoryblokPageProps(fullSlug, locale, preview, {
    resolve_relations: 'Session.course',
  });

  return {
    props: {
      ...storyblokProps,
      messages: {
        ...require(`../../../messages/shared/${locale}.json`),
        ...require(`../../../messages/navigation/${locale}.json`),
        ...require(`../../../messages/courses/${locale}.json`),
      },
    },
    revalidate: 3600, // revalidate every hour
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const sbParams: ISbStoriesParams = {
    published: true,
    starts_with: 'courses/',
  };

  const paths = await getStoryblokPaths({
    sbParams,
    locales,
    validateSlug: isAlternativelyHandledSession
  })

  return {
    paths,
    fallback: false,
  };
}

const isAlternativelyHandledSession = (slug: string) => slug.includes('/image-based-abuse-and-rebuilding-ourselves/');

export default SessionDetail;

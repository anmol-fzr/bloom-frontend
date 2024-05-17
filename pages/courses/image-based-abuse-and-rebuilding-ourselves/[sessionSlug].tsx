import { ISbStoriesParams, ISbStoryData, useStoryblokState } from '@storyblok/react';
import { GetStaticPathsContext, GetStaticPropsContext, NextPage } from 'next';
import NoDataAvailable from '../../../components/common/NoDataAvailable';
import StoryblokSessionIbaPage, {
  StoryblokSessionIbaPageProps,
} from '../../../components/storyblok/StoryblokSessionIbaPage';
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
    <StoryblokSessionIbaPage
      {...(story.content as StoryblokSessionIbaPageProps)}
      storyId={story.id}
      storyUuid={story.uuid}
      storyPosition={story.position}
    />
  );
};

export async function getStaticProps({ locale, preview = false, params }: GetStaticPropsContext) {
  let sessionSlug =
    params?.sessionSlug instanceof Array ? params.sessionSlug.join('/') : params?.sessionSlug;
  const fullSlug = `courses/image-based-abuse-and-rebuilding-ourselves/${sessionSlug}`;

  const storyblokProps = await getStoryblokPageProps(fullSlug, locale, preview, {
    resolve_relations: 'session_iba.course',
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
    starts_with: 'courses/image-based-abuse-and-rebuilding-ourselves/',
  };

  const paths = await getStoryblokPaths({
    sbParams, locales
  })

  return {
    paths,
    fallback: false,
  };
}

export default SessionDetail;

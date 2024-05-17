import { ISbStoriesParams, ISbStoryData } from '@storyblok/react'
import { getStoryblokApi } from '@storyblok/react'
import { GetStaticPathsContext } from 'next';

type DoSomeProps = Pick<GetStaticPathsContext, 'locales'> & {
  sbParams: ISbStoriesParams;
  validateSlug?: (slug: string) => boolean
}

type Path = {
  params: {
    slug: string
    sessionSlug: string
  },
  locale: string
}

const getStoryblokPaths = async ({ locales, sbParams, validateSlug }: DoSomeProps) => {
  const storyblokApi = getStoryblokApi();
  let sessions: ISbStoryData[] = await storyblokApi.getAll('cdn/links', sbParams);


  const paths: Path[] = []

  sessions.forEach((session) => {
    const rawSlug = session.slug;

    if (!rawSlug) return;
    if (validateSlug) {
      if (session.is_startpage || session.is_folder || validateSlug(rawSlug)) return;
    }
    if (session.is_startpage || session.is_folder) return;

    let splittedSlug = rawSlug.split('/');

    if (locales) {
      for (const locale of locales) {
        paths.push({ params: { slug: splittedSlug[1], sessionSlug: splittedSlug[2] }, locale });
      }
    }
  });


  return paths
}

export { getStoryblokPaths }

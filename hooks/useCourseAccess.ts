import { useState, useEffect } from 'react';
import { StoryblokSessionPageProps } from '../components/storyblok/StoryblokSessionPage';
import hasAccessToPage from '../utils/hasAccessToPage';
import { useTypedSelector } from './store';
import { ISbStoryData } from '@storyblok/react';


const useCourseAccess = (course: ISbStoryData) => {
  const partnerAccesses = useTypedSelector(state => state.partnerAccesses)
  const partnerAdmin = useTypedSelector((state) => state.partnerAdmin);

  const liveCourseAccess = partnerAccesses.length === 0 && !partnerAdmin.id;

  const [incorrectAccess, setIncorrectAccess] = useState(false);
  const [liveChatAccess, setLiveChatAccess] = useState(false);

  useEffect(() => {
    const coursePartners = course.content.included_for_partners;
    setIncorrectAccess(!hasAccessToPage(coursePartners, partnerAccesses, partnerAdmin));

    const liveAccess = partnerAccesses.find(
      (partnerAccess) => partnerAccess.featureLiveChat === true,
    );

    if (liveAccess || liveCourseAccess) setLiveChatAccess(true);
  }, [course, partnerAccesses, partnerAdmin, liveCourseAccess]);

  return { incorrectAccess, liveChatAccess };
};

export { useCourseAccess }

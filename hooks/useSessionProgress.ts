import { ISbStoryData } from '@storyblok/react';
import { useEffect, useState } from 'react';
import { useTypedSelector } from './store';
import { PROGRESS_STATUS } from '../constants/enums';
import { Course, Session } from '../app/coursesSlice';

const useSessionProgress = (course: ISbStoryData, storyUuid: string, storyId: number) => {
  const [weekString, setWeekString] = useState('');
  const courses = useTypedSelector(state => state.courses)
  const [sessionProgress, setSessionProgress] = useState<PROGRESS_STATUS>(
    PROGRESS_STATUS.NOT_STARTED,
  );

  useEffect(() => {
    course.content.weeks.map((week: any) => {
      week.sessions.map((session: any) => {
        session === storyUuid && setWeekString(week.name);
      });
    });

    const userCourse = courses.find((c: Course) => Number(c.storyblokId) === course.id);

    if (userCourse) {
      const userSession = userCourse.sessions.find(
        (session: Session) => Number(session.storyblokId) === storyId,
      );

      if (userSession) {
        userSession.completed
          ? setSessionProgress(PROGRESS_STATUS.COMPLETED)
          : setSessionProgress(PROGRESS_STATUS.STARTED);
      }
    }
  }, [courses, course.content.weeks, course.id, storyId, storyUuid]);


  return { weekString, sessionProgress }
}

export { useSessionProgress }

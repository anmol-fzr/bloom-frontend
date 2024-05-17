import logEvent from '../utils/logEvent';
import { SESSION_STARTED_REQUEST, SESSION_STARTED_ERROR, SESSION_STARTED_SUCCESS } from '../constants/events'
import { useStartSessionMutation } from '../app/api';
import { useCallback } from 'react';

type Props = {
  eventData: any
  name: string
  storyId: number
}


const useSession = async ({ eventData, name, storyId }: Props) => {
  const [startSession] = useStartSessionMutation();

  const onSessionStart = useCallback(async () => {
    logEvent(SESSION_STARTED_REQUEST, {
      ...eventData,
      session_name: name,
      course_name: name,
    });

    const startSessionResponse = await startSession({
      storyblokId: storyId,
    });

    if ('data' in startSessionResponse) {
      logEvent(SESSION_STARTED_SUCCESS, eventData);
    }

    if ('error' in startSessionResponse) {
      const error = startSessionResponse.error;

      logEvent(SESSION_STARTED_ERROR, eventData);
      (window as any).Rollbar?.error('Session started error', error);

      throw error;
    }
  }, [eventData, name, storyId])

  return { onSessionStart }
}

export { useSession }

import { useEffect } from 'react';
import logEvent from '../utils/logEvent';
import { SESSION_VIEWED } from '../constants/events'

const useSessionView = (eventData: any) => {
  useEffect(() => {
    logEvent(SESSION_VIEWED, eventData);
  }, []);
}

export { useSessionView }

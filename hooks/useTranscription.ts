import { useEffect, useState } from 'react';
import { PROGRESS_STATUS } from '../constants/enums';
import logEvent from '../utils/logEvent';
import {
  SESSION_VIDEO_TRANSCRIPT_CLOSED, SESSION_VIDEO_TRANSCRIPT_OPENED,
} from '../constants/events';

type Props = {
  sessionProgress: PROGRESS_STATUS;
  callStartSession: () => void
  name: string
  eventData: any,
}

const useTranscription = ({ sessionProgress, callStartSession, eventData, name }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)


  useEffect(() => {
    if (isOpen === null) return;

    logEvent(
      isOpen ? SESSION_VIDEO_TRANSCRIPT_OPENED : SESSION_VIDEO_TRANSCRIPT_CLOSED,
      {
        ...eventData,
        session_name: name,
        course_name: name,
      },
    );
    if (isOpen && sessionProgress === PROGRESS_STATUS.NOT_STARTED) {
      callStartSession();
    }
  }, [isOpen]);

  return { openTranscriptModal: isOpen, setOpenTranscriptModal: setIsOpen }

}
export { useTranscription }

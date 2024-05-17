import { useState, useEffect } from 'react';
import { PROGRESS_STATUS } from '../constants/enums';

type Props = {
  callStartSession: () => void
  sessionProgress: PROGRESS_STATUS
}

const useVideoStart = ({ callStartSession, sessionProgress }: Props) => {
  const [isStarted, setIsStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!isStarted || sessionProgress !== PROGRESS_STATUS.NOT_STARTED) return;

    if (isStarted) {
      callStartSession();
    }
  }, [isStarted, sessionProgress]);

  return { onVideoStart: setIsStarted }
}

export { useVideoStart }

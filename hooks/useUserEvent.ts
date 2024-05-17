import { getEventUserData } from '../utils/logEvent';
import { useTypedSelector } from './store';

const useUserEvent = () => {
  const userCreatedAt = useTypedSelector((state) => state.user.createdAt);
  const partnerAccesses = useTypedSelector((state) => state.partnerAccesses);
  const partnerAdmin = useTypedSelector((state) => state.partnerAdmin);

  const eventUserData = getEventUserData(userCreatedAt, partnerAccesses, partnerAdmin);

  return eventUserData
}

export { useUserEvent }

import Script from 'next/script';
import { useEffect } from 'react';
import { RootState } from '../../app/store';
import { CHAT_MESSAGE_SENT, CHAT_STARTED, FIRST_CHAT_STARTED } from '../../constants/events';
import { useTypedSelector } from '../../hooks/store';
import logEvent, { getEventUserData } from '../../utils/logEvent';

const CrispScript = () => {
  const { user, partnerAccesses, partnerAdmin } = useTypedSelector((state: RootState) => state);

  const eventData = getEventUserData({ user, partnerAccesses, partnerAdmin });

  useEffect(() => {
    if ((window as any).$crisp && (window as any).$crisp.is) {
      if (user.email) {
        (window as any).$crisp.push(['set', 'user:email', [user.email]]);

        if ((window as any).$crisp.is('chat:hidden')) {
          (window as any).$crisp.push(['do', 'chat:show']);
        }
      } else if ((window as any).$crisp.is('chat:visible')) {
        (window as any).$crisp.push(['do', 'chat:hide']);
      }
    }
  });

  useEffect(() => {
    if ((window as any).$crisp && (window as any).$crisp.push) {
      (window as any).$crisp.push([
        'on',
        'chat:initiated',
        () => {
          logEvent(FIRST_CHAT_STARTED, eventData);
        },
      ]);
      (window as any).$crisp.push([
        'on',
        'message:sent',
        () => {
          logEvent(CHAT_MESSAGE_SENT, eventData);
        },
      ]);
      (window as any).$crisp.push([
        'on',
        'chat:opened',
        () => {
          logEvent(CHAT_STARTED, eventData);
        },
      ]);
    }
  }, []);

  const crispScriptUrl = 'https://client.crisp.chat/l.js';

  return (
    <Script
      id="crisp-widget"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}";
            (function(){
              const d = document;
              const s = d.createElement("script");
              s.src = "${crispScriptUrl}";
              s.async = 1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();`,
      }}
    />
  );
};

export default CrispScript;

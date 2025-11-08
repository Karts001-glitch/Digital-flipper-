import React from 'react';

type IconName = 'dollar' | 'rocket' | 'target' | 'megaphone' | 'pitch' | 'check' | 'loading' | 'wallet' | 'plus' | 'minus' | 'refresh' | 'chatBubble' | 'globe' | 'visa' | 'stripe' | 'paypal' | 'googlePay' | 'lock' | 'crown' | 'info' | 'error';

interface IconProps {
  name: IconName;
  className?: string;
}

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const ICONS: Record<IconName, React.ReactElement> = {
  dollar: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-6h6" />,
  rocket: <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a6 6 0 01-8.25-8.25l2.41 2.41" />,
  target: <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  megaphone: <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.5" />,
  pitch: <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />,
  loading: <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 9a9 9 0 0114.13-6.36M20 15a9 9 0 01-14.13 6.36" />,
  wallet: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5h16.5V3.75H3.75zM19.5 8.25h-15m15 4.5h-15" />,
  plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
  minus: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />,
  refresh: <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.182-3.182m0-11.667a8.25 8.25 0 00-11.667 0L2.985 7.985" />,
  chatBubble: <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m2.625 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.94-.416-1.253a5.964 5.964 0 01-1.28-4.125C3 7.444 7.03 3.75 12 3.75c4.97 0 9 3.706 9 8.25z" />,
  globe: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9.75c0 5.43-4.22 9.82-9.75 9.82S2.25 15.18 2.25 9.75 6.47 0 12 0s9.75 4.32 9.75 9.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 9.75h19.5" />,
  visa: <path d="M3.5,13h4a.5.5,0,0,0,0-1h-4a.5.5,0,0,0,0,1Zm10.5-5.5a.5.5,0,0,0-.5.5v5a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,0-1h-1.5v-1.5h1a.5.5,0,0,0,0-1h-1v-1.5h1.5a.5.5,0,0,0,0-1Z M12.5,8h-2a.5.5,0,0,0-.5.5v5a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,0-1h-1.5V8.5h1.5a.5.5,0,0,0,0-1Z M8.5,8h-2a.5.5,0,0,0,0,1h1.5v4.5a.5.5,0,0,0,1,0v-5A.5.5,0,0,0,8.5,8Z M22,7H2A1,1,0,0,0,1,8v8a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V8A1,1,0,0,0,22,7ZM2,16V8H22V16Z" />,
  stripe: <path d="M18,9.31a6.38,6.38,0,0,0-6.38,6.38v0a.5.5,0,0,0,1,0v0A5.39,5.39,0,0,1,18,10.31a.5.5,0,0,0,0-1ZM11.62,3A.5.5,0,0,0,11.12,3v0A5.39,5.39,0,0,1,5.75,8.38a.5.5,0,0,0,1,0A6.38,6.38,0,0,0,11.62,2v0A.5.5,0,0,0,11.62,3Zm0,12.38A6.38,6.38,0,0,0,18,9.31a.5.5,0,0,0-1,0,5.39,5.39,0,0,1-5.38,5.38v0a.5.5,0,0,0,0,1Z M3,8.38A6.38,6.38,0,0,0,8.38,14.69a.5.5,0,0,0,0-1A5.39,5.39,0,0,1,3,8.38v0a.5.5,0,0,0-1,0Z M12.63,9.31a.5.5,0,0,0-.5-.5h-1a.5.5,0,0,0-.5.5v5.38a.5.5,0,0,0,1,0Z" />,
  paypal: <path d="M12.55,6.36h4.48a1.36,1.36,0,0,0,1.3-1.6A1.4,1.4,0,0,0,17,3.5H10.8L7.68,17.64a.5.5,0,0,0,.49.63H11a.5.5,0,0,0,.49-.37l.73-3.48a.51.51,0,0,1,.49-.37h1.49l-.36,1.72a.5.5,0,0,0,.49.63h2.32a.5.5,0,0,0,.49-.37l1.3-6.19a1,1,0,0,0-.94-1.22H11.66a.5.5,0,0,0-.49.37l-.54,2.57Z" />,
  googlePay: <path d="M21.19,10.23A1.19,1.19,0,0,0,22,9.34V9.22a5.49,5.49,0,0,0-5.46-5.47H7.49A5.5,5.5,0,0,0,2,9.25v5.49a5.5,5.5,0,0,0,5.49,5.5H16.5a5.5,5.5,0,0,0,5.5-5.49v-.1A1.19,1.19,0,0,0,21.19,10.23ZM16.5,19.24H7.49a4.5,4.5,0,0,1-4.5-4.5V9.25a4.5,4.5,0,0,1,4.5-4.5H16.5a4.5,4.5,0,0,1,4.5,4.5v5.49A4.5,4.5,0,0,1,16.5,19.24Z M10.59,10.41H16.2a.5.5,0,0,0,.5-.5V8.55a.5.5,0,0,0-.5-.5H10.88L13.5,5.43a.5.5,0,0,0-.35-.85H11.56a.5.5,0,0,0-.44.24l-3,4.64v.05h0l-.1.17,0,.07a.5.5,0,0,0,.44.76Z M18.44,11.59a.5.5,0,0,0-.44-.24H15.43a.5.5,0,0,0-.43.74L17.2,16a.5.5,0,0,0,.44.25H18a.5.5,0,0,0,.44-.75Z" />,
  lock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
  crown: <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h13.5M5.25 11.25h13.5m-13.5 3h13.5M3 6.75l3-3 3 3 3-3 3 3M3 17.25l3-3 3 3 3-3 3 3" />,
  info: <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  error: <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />,
};

const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
  const iconElement = ICONS[name];
  
  if (['visa', 'stripe', 'paypal', 'googlePay'].includes(name)) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
            {iconElement}
        </svg>
      )
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      {iconElement}
    </svg>
  );
};

export default Icon;
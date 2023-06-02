import './App.css';
import { useEffect, useState } from 'react';
import { Button, Steps, theme } from 'antd';
import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT, IProfile, IDate, FirstContent, SecondContent, LastContent } from './steps';
import ErrorBoundary from './ErrorBoundary';

const ME_URL = "https://kumba.free.beeceptor.com/me";
const SUBMIT_URL = "https://kumba.free.beeceptor.com/submit";

const initialProfile = { firstName: "", lastName: "", email: "" };
const initialDate = { date: dayjs().format(DATE_FORMAT), time: dayjs().format(TIME_FORMAT) };

function App() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [profile, setProfile] = useState<IProfile>(initialProfile);
  const [date, setDate] = useState<IDate>(initialDate);
  const [isSubmitSucceed, setIsSubmitSucceed] = useState<boolean>(false);

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
    height: '130px',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  
  const steps = [
    {
      title: "First",
      content: <FirstContent profile={profile} onChange={setProfile} />,
      next: () => next(),
    },
    {
      title: "Second",
      content: <SecondContent date={date} onChange={setDate} />,
      next: () => { 
        fetch(SUBMIT_URL, { 
          method: "Post",
          body: JSON.stringify({...profile, ...date}),
        })
        .then((res) => {
          setIsSubmitSucceed(res.ok);
          next();
        })
        .catch((error) => console.warn(error))
       }
    },
    {
      title: 'Last',
      content: <LastContent isSuccess={isSubmitSucceed} tryAgainHandler={() => setCurrent(0)} />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const stepItems = steps.map((item) => ({ key: item.title, title: item.title }));
  
  useEffect(() => {
    fetch(ME_URL)
      .then((res) => res.json())
      .then(({ data, status }) => {
        if(status === "success") {
          const [firstName, lastName] = data.name.split(" "); 
          const email = data.email;
          
          setProfile({ firstName, lastName, email });
        }
      })
      .catch((error) => console.warn(error))
  }, []);
  
  return (
    <ErrorBoundary>
      <Steps current={current} items={stepItems} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between" }}>
        {current > 0 && current !== steps.length - 1 && (
          <Button onClick={() => prev()}>
            Previous
          </Button>
        )}
        {(current < steps.length - 1) && (
          <Button type="primary" style={{ marginLeft: 'auto' }} onClick={() => steps[current].next()} >
            Next
          </Button>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App

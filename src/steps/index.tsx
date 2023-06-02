import { Input, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';

export const DATE_FORMAT = "DD/MM/YYYY";

export const TIME_FORMAT = "HH:mm";

export interface IProfile {
    firstName: string;
    lastName: string;
    email: string;
}
  
export interface IDate {
    date: string;
    time: string;
}

export interface FirstProps {
    profile: IProfile;
    onChange: (profile: IProfile) => void;
}

export interface SecondProps {
    date: IDate;
    onChange: (date: IDate) => void;
}

export interface LastProps {
    isSuccess: boolean;
    tryAgainHandler?: () => void;
}
  
export const FirstContent: React.FC<FirstProps> = ({ profile, onChange }) => {
    const { firstName, lastName, email } = profile;
    return (
        <>
            <Input data-testid="email-input" placeholder="First name" value={firstName} onChange={(e) => onChange({...profile, firstName: e.target.value })} />
            <Input placeholder="Last name" value={lastName} onChange={(e) => onChange({...profile, lastName: e.target.value })} />
            <Input placeholder="Email" value={email} onChange={(e) => onChange({...profile, email: e.target.value })} />
        </>
    );
}
  
export const SecondContent: React.FC<SecondProps> = ({ date, onChange }) => (
    <>
        <DatePicker onChange={(_, dateString) => { onChange({ ...date, date: dateString }) }} defaultValue={dayjs(new Date())} />
        <TimePicker defaultValue={dayjs(new Date())} format={TIME_FORMAT} onChange={(_, dateString) => { onChange({ ...date, time: dateString }) }}/>
    </>
);
  
export const LastContent: React.FC<LastProps> = ({ isSuccess, tryAgainHandler }) => (
    <>
        <p>{isSuccess ? "Success message" : "Error message"}</p>
        {!isSuccess && <a style={{ cursor: "pointer" }} onClick={tryAgainHandler}>try again</a>}
    </>
);
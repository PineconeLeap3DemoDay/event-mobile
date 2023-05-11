import React from 'react';
import { CalendarSm, 
    CalendarBg, 
    ArrowLeft,
    Location,
    Movie,
    Hamburgermenu, 
    Home, 
    Medicine,
    Favorite,
    Music,
    Notification, 
    Search, 
    User,
    Clock,
    Ticket,
    Close,
    Sun,
    Settings,
    UserRounded,
    Message,
    Key
} from './index';
type IconNames = {
    CalendarBg: any;
    CalendarSm: any
    ArrowLeft: any
    Location: any,
    Movie: any,
    Hamburgermenu: any, 
    Home: any, 
    Medicine: any,
    Favorite: any,
    Music: any,
    Notification: any, 
    Search: any, 
    User: any,
    Clock: any,
    Ticket: any,
    Close: any,
    Sun: any,
    Settings: any,
    UserRounded: any,
    Message: any,
    Key: any
}

const Icons = {
    CalendarBg,
    CalendarSm,
    ArrowLeft,
    Location,
    Movie,
    Hamburgermenu, 
    Home, 
    Medicine,
    Favorite,
    Music,
    Notification, 
    Search, 
    User,
    Clock,
    Ticket,
    Close,
    Sun,
    Settings,
    UserRounded,
    Message,
    Key
}
interface IconProps {
    name: keyof IconNames,
    fill?: string,
    stroke?: string
}

export function Icon({ name, fill = 'none', stroke }: IconProps) {
    //@ts-ignore
    return React.createElement(Icons[name], { fill: fill, stroke: stroke });
}

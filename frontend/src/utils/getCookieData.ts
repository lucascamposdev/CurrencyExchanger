import Cookies from 'js-cookie';
import TOKEN_COOKIE_NAME from './TOKEN_COOKIE_NAME';

type UserDataType = {
    email: string,
    name: string
}

type CookieObjectType = {
    userData: UserDataType;
    token: string;
}

const getCookieData = (): CookieObjectType | null =>{
    const rawData = Cookies.get(TOKEN_COOKIE_NAME);
  
    let cookieObject: CookieObjectType;

    if (rawData) {
      try {
        cookieObject = JSON.parse(rawData);
        return cookieObject;
      } catch (error) {
        console.error('Failed to parse cookie data', error);
        return null;
      }
    }

    return null;
}

export default getCookieData;
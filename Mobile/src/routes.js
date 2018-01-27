import HomeScreen from './screens/HomeScreen';
import QRCodeScreen from './screens/QRCodeScreen';

export const ROUTE_NAMES = {
  HOME: 'HOME',
  QR_CODE: 'QR_CODE',
};

const routes = {
  [ROUTE_NAMES.HOME]: {
    screen: HomeScreen,
  },
  [ROUTE_NAMES.QR_CODE]: {
    screen: QRCodeScreen,
  },
};

export default routes;

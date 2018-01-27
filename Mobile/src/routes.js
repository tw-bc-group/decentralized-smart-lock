import HomeScreen from './screens/HomeScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import SettingsScreen from './screens/SettingsScreen';

export const ROUTE_NAMES = {
  HOME: 'HOME',
  QR_CODE: 'QR_CODE',
  SETTINGS: 'SETTINGS',
};

const routes = {
  [ROUTE_NAMES.HOME]: {
    screen: HomeScreen,
  },
  [ROUTE_NAMES.QR_CODE]: {
    screen: QRCodeScreen,
  },
  [ROUTE_NAMES.SETTINGS]: {
    screen: SettingsScreen,
  },
};

export default routes;

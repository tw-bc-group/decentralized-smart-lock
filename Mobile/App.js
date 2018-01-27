/* eslint-disable import/first */
import './global';

import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';

import routes from './src/routes';

const App = StackNavigator(routes, {
  headerMode: 'none',
  cardStyle: {
    paddingTop: Constants.statusBarHeight,
  },
});

export default App;

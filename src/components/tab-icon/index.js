import React, {Component} from 'react';
// Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class TabIcon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {icon, tintColor} = this.props;
    return <MaterialCommunityIcon color={tintColor} size={24} name={icon} />;
  }
}

export default TabIcon;

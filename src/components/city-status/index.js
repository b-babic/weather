import React from 'react';
// Primitives
import {Box} from 'primitives';
// Icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// Theme
import {useTheme} from 'hooks';

const CityStatus = ({isActive}) => {
  const theme = useTheme();
  const iconColor = isActive
    ? theme.colors.activeIcon
    : theme.colors.inactiveIcon;

  return (
    <Box>
      <MaterialIcon name="check-circle" size={16} color={iconColor} />
    </Box>
  );
};

export default CityStatus;

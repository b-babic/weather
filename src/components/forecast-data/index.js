import React from 'react';
import {Text, Box} from 'primitives';
// Hooks
import {useTheme} from 'hooks';

function ForecastData({
  isLoading,
  error,
  name,
  longitude,
  latitude,
  temperature,
  weatherCondition,
}) {
  const theme = useTheme();
  return (
    <Box bg={theme.colors.bg}>
      <Text>Fetching forecast for: {name}</Text>
      <Text>{longitude}</Text>
      <Text>{latitude}</Text>
      <Text>{temperature}</Text>
      <Text>{weatherCondition}</Text>
    </Box>
  );
}
export default ForecastData;

// /* {isLoading && error.length === 0 && (
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text>Loading</Text>
//         </View>
//       )} */

// /* {error.length > 0 && (
//         <View>
//           <Text>ERror : {error}</Text>
//         </View>
//       )} */

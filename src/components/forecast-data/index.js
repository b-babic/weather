import React from 'react';
import {ActivityIndicator} from 'react-native';
// primitives
import {Text, Box} from 'primitives';
// Hooks
import {useTheme} from 'hooks';
// Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function ForecastData({
  isLoading,
  error,
  name,
  longitude,
  latitude,
  temperature,
  weatherCondition,
  humidity,
  tempMin,
  tempMax,
}) {
  const theme = useTheme();
  // Pretty much whenever name is not present, other parts arent too;
  const noData = !name || name.length === 0;
  if (noData) {
    return (
      <Box
        bg={theme.colors.bg}
        flex={1}
        alignItems="center"
        justifyContent="center"
        style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
        px={4}
        py={4}>
        <ActivityIndicator size="large" color={theme.colors.activeIcon} />
      </Box>
    );
  }
  return (
    <Box
      bg={theme.colors.bg}
      flex={1}
      style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
      px={4}
      py={4}>
      <Text color={theme.colors.title} fontSize={5}>
        {name}
      </Text>
      <Box alignItems="center" flexDirection="row" mb={4}>
        <Box mr={2}>
          <MaterialCommunityIcon
            name="map-marker"
            color={theme.colors.text}
            size={24}
          />
        </Box>
        <Box justifyContent="center">
          <Box>
            <Text color={theme.colors.subtitle} fontSize={2}>
              {longitude}
            </Text>
          </Box>
          <Box>
            <Text color={theme.colors.subtitle} fontSize={2}>
              {latitude}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        mb={4}>
        <Box mr={2} flex={3}>
          <Box mb={2}>
            <Text
              color={theme.colors.title}
              fontSize={4}
              style={{fontWeight: 'normal'}}>
              {weatherCondition}
            </Text>
          </Box>
          <Box>
            <Text
              color={theme.colors.title}
              fontSize={5}
              style={{fontWeight: 'bold'}}>
              {temperature} ℃
            </Text>
          </Box>
        </Box>
        <Box flex={2}>
          <MaterialCommunityIcon
            color={theme.colors.activeIcon}
            name="weather-windy-variant"
            size={60}
          />
        </Box>
      </Box>

      <Box flexDirection="row">
        <Box flex={1}>
          <Text color={theme.colors.subtitle} fontSize={2}>
            T.Max
          </Text>
          <Text color={theme.colors.subtitle}>{tempMax}</Text>
        </Box>
        <Box flex={1}>
          <Text color={theme.colors.subtitle} fontSize={2}>
            T.Min
          </Text>
          <Text color={theme.colors.subtitle} fontSize={2}>
            {tempMin}
          </Text>
        </Box>
        <Box flex={1}>
          <Text color={theme.colors.subtitle} fontSize={2}>
            Humidity
          </Text>
          <Text color={theme.colors.subtitle}> {humidity}</Text>
        </Box>
      </Box>
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

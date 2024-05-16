import { useSharedValue, withTiming } from 'react-native-reanimated';

export const scrollToTop = (scrollViewRef) => {
  if (scrollViewRef.current) {
    const y = useSharedValue(scrollViewRef.current.contentOffset.y);
    y.value = withTiming(0, { duration: 2000 }); 
    scrollViewRef.current.scrollTo({ y: y.value, animated: false });
  }
};

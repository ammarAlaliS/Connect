import { useSharedValue, withTiming } from 'react-native-reanimated';

export const useSharedValueForScroll = () => {
  return useSharedValue(0);
}

export const scrollToTop = (scrollViewRef) => {
  if (scrollViewRef.current) {
    const y = useSharedValueForScroll();
    y.value = withTiming(0, { duration: 2000 }); 
    scrollViewRef.current.scrollTo({ y: y.value, animated: false });
  }
};

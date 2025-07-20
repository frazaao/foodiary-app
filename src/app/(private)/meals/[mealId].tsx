import { Text, View } from "react-native";
import { Button } from "../../../components/button";
import { ChevronLeftIcon } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";

const MealDetailPage: React.FC = () => {
  const { mealId } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Detalhes da refeição: {mealId}</Text>

      <Button size="icon" onPress={router.back}>
        <ChevronLeftIcon />
      </Button>
    </View>
  );
};

export default MealDetailPage;

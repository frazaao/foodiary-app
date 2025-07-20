import { Text, TouchableOpacity, View } from "react-native";

interface MealCardProps {
  icon: string;
  name: string;
  foods: string;
}

export const MealCard: React.FC<MealCardProps> = ({ icon, name, foods }) => {
  return (
    <TouchableOpacity>
      <Text className="text-base font-sans-regular text-gray-700">
        Hoje, 12h25
      </Text>

      <View className="mt-2 px-4 py-5 flex-row items-center gap-3 border border-gray-400 rounded-2xl">
        <View className="size-12 bg-gray-200 rounded-full items-center justify-center">
          <Text>{icon}</Text>
        </View>

        <View>
          <Text className="text-base font-sans-regular text-gray-700">
            {name}
          </Text>
          <Text className="text-base font-sans-medium text-black-700">
            {foods}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

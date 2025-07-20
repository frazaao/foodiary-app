import { FlatList, Text, View } from "react-native";
import { MealCard } from "./meal-card";
import { DateSwitcher } from "./date-switcher";
import { DailyStats } from "./daily-stats";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const meals = [
  {
    id: Math.random().toString(),
    icon: "🍞",
    name: "Café da manhã",
    subtitle: "Pao, manteiga e café",
  },
  {
    id: Math.random().toString(),
    icon: "🍞",
    name: "Almoço",
    subtitle: "Arroz, feijão e bife",
  },
  {
    id: Math.random().toString(),
    icon: "🍞",
    name: "Jantar",
    subtitle: "Pao, manteiga e café",
  },
  {
    id: Math.random().toString(),
    icon: "🍞",
    name: "Seia",
    subtitle: "Pao, manteiga e café",
  },
];

export const MealsListHeader: React.FC = () => {
  return (
    <>
      <DateSwitcher />

      <DailyStats
        calories={{ current: 500, goal: 1000 }}
        carbohydrates={{ current: 100, goal: 200 }}
        fats={{ current: 100, goal: 200 }}
        proteins={{ current: 100, goal: 200 }}
      />

      <Text className="text-black-700 m-5 text-base font-sans-medium tracking-[1.28px]">
        REFEIÇÕES
      </Text>
    </>
  );
};

const Separator = () => {
  return <View className="h-8" />;
};

export const MealsList = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }}
      ListHeaderComponent={MealsListHeader}
      ItemSeparatorComponent={Separator}
      data={meals}
      keyExtractor={(meal) => meal.id}
      renderItem={({ item: meal }) => (
        <View className="mx-5">
          <MealCard
            id={meal.id}
            icon={meal.icon}
            name={meal.name}
            foods={meal.subtitle}
          />
        </View>
      )}
    />
  );
};

import { Link } from "expo-router";
import { Text, View } from "react-native";

const SignUpPage: React.FC = () => {
  return (
    <View>
      <Link href="/signin">
        <Text>Entrar</Text>
      </Link>
    </View>
  );
};

export default SignUpPage;

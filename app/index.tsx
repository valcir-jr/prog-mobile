import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "../contexts/AuthProvider";
import Login from "../screens/app_scholar/Login";
import Register from "../screens/app_scholar/Register";
import Homepage from "../screens/app_scholar/Homepage";

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Cadastro" }}
        />
        <Stack.Screen
          name="Home"
          component={Homepage}
          options={{ title: "Home" }}
        />
      </Stack.Navigator>
    </AuthProvider>
  );
};

export default App;

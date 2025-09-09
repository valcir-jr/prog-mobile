import { createDrawerNavigator } from "@react-navigation/drawer";
import Quatro from "@/screens/atv_dois/atv4";

const Drawer = createDrawerNavigator();

const App: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Quatro} options={{ title: "ViaCEP" }} />
    </Drawer.Navigator>
  );
}

export default App;
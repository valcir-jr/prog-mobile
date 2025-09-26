import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "@/contexts/CepProvider";
import Quatro from "@/screens/atv_dois/atv4";
import Cinco from "@/screens/atv_dois/atv5";

const Drawer = createDrawerNavigator();

const App: React.FC = () => {
  return (
    <Provider>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Quatro} options={{ title: "ViaCEP" }} />
        <Drawer.Screen name="Histórico" component={Cinco} options={{ title: "Histórico" }} />
      </Drawer.Navigator>
    </Provider>
  );
}

export default App;
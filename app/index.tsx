import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "../contexts/AuthProvider";
import Login from "../screens/app_scholar/Login";
import Register from "../screens/app_scholar/Register";
import Homepage from "../screens/app_scholar/Homepage";
import Boletim from "../screens/app_scholar/Boletim";
import Grades from "../screens/app_scholar/Grades";
import RegisterStudent from "../screens/app_scholar/RegisterStudent";
import RegisterProf from "../screens/app_scholar/RegisterProf";
import RegisterSubject from "../screens/app_scholar/RegisterSubject";
import SubjectsByProfessor from "../screens/app_scholar/SubjectsByProfessor";
import StudentsBySubject from "../screens/app_scholar/StudentsBySubject";

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
        <Stack.Screen
          name="Boletim"
          component={Boletim}
          options={{ title: "Boletim" }}
        />
        <Stack.Screen
          name="Grades"
          component={Grades}
          options={{ title: "Lançamento de notas" }}
        />
        <Stack.Screen
          name="RegisterStudent"
          component={RegisterStudent}
          options={{ title: "RegisterStudent" }}
        />
        <Stack.Screen
          name="RegisterProf"
          component={RegisterProf}
          options={{ title: "RegisterProf" }}
        />
        <Stack.Screen
          name="RegisterSubject"
          component={RegisterSubject}
          options={{ title: "RegisterSubject" }}
        />
        <Stack.Screen
          name="SubjectsByProfessor"
          component={SubjectsByProfessor}
          options={{ title: "Disciplinas por professor" }}
        />

        <Stack.Screen
          name="StudentsBySubject"
          component={StudentsBySubject}
          options={{ title: "Alunos por disciplina" }}
        />
      </Stack.Navigator>
    </AuthProvider>
  );
};

export default App;

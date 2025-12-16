import "@/i18n";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "./global.css";

export default function RootLayout() {

  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}

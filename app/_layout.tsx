import "@/i18n";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "./global.css";

import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import id from "i18n-iso-countries/langs/id.json";

countries.registerLocale(en);
countries.registerLocale(id);

export default function RootLayout() {

  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}

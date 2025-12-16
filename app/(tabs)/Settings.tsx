import ScreenLayout from "@/components/ScreenLayout";
import i18n from "@/i18n";
import { setLanguageGlobal } from "@/redux/slices/languageSlice";
import { setMetricsGlobal } from "@/redux/slices/temperatureUnitSlice";
import { setTimeFormatGlobal } from "@/redux/slices/timeFormatSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";


export default function Search() {

  const dispatch = useDispatch<AppDispatch>();
  const { languageGlobal, APILanguageCode } = useSelector((state: RootState) => state.language);
  const { unitNameGlobal } = useSelector((state: RootState) => state.temperatureUnit);
  const { timeFormatGlobal } = useSelector((state: RootState) => state.timeFormat)

  const [languageLocal, setLang] = useState(languageGlobal);
  const [metricsLocal, setMetrics] = useState(unitNameGlobal);
  const [timeFormatLocal, setTimeFormat] = useState(timeFormatGlobal);

  const { t } = useTranslation();

  function handleApplyChangeSettings() {
    if (languageLocal !== languageGlobal) {
      dispatch(setLanguageGlobal(languageLocal));
    }

    if (metricsLocal !== unitNameGlobal) {
      dispatch(setMetricsGlobal(metricsLocal))
    }

    if (timeFormatLocal !== timeFormatGlobal) {
      dispatch(setTimeFormatGlobal(timeFormatLocal))
    }
  }

  useEffect(() => {
    i18n.changeLanguage(APILanguageCode);
  }, [APILanguageCode]);

  return (
    <ScreenLayout>
      <View className="mt-8 gap-12">

        <View className="flex-row justify-center items-center">
          <Ionicons name="settings-outline" size={32} color={'#FFFFFF'} />
          <Text className="text-white text-4xl">&nbsp;{t("settings.settings")}</Text>
        </View>

        <View className="items-center gap-2">
          <Text className="text-white text-xl">Language / Bahasa</Text>
          <View className="flex-row">
            <Pressable onPress={() => setLang('English')} className={`rounded-l-xl border-r border-slate-400 py-2 px-4 ${languageLocal === 'English' ? 'bg-blue-500' : 'bg-slate-600'}`}>
              <Text className="text-white text-xl">English</Text>
            </Pressable>
            <Pressable onPress={() => setLang('Indonesia')} className={`rounded-r-xl py-2 px-4 ${languageLocal === 'Indonesia' ? 'bg-blue-500' : 'bg-slate-600'}`}>
              <Text className="text-white text-xl">Indonesia</Text>
            </Pressable>
          </View>
        </View>

        <View className="items-center gap-2">
          <Text className="text-white text-xl">{t("settings.metrics")}</Text>
          <View className="flex-row">

            <Pressable onPress={() => setMetrics('Fahrenheit')} className={`rounded-l-xl py-2 px-4 ${metricsLocal === 'Fahrenheit' ? 'bg-blue-500' : 'bg-slate-600'}`}>
              <Text className="text-white text-xl">Fahrenheit</Text>
            </Pressable>

            <Pressable onPress={() => setMetrics('Celcius')} className={`border-x border-slate-400 py-2 px-4 ${metricsLocal === 'Celcius' ? 'bg-blue-500' : 'bg-slate-600'}`}>
              <Text className="text-white text-xl">Celcius</Text>
            </Pressable>

            <Pressable onPress={() => setMetrics('Kelvin')} className={`rounded-r-xl py-2 px-4 ${metricsLocal === 'Kelvin' ? 'bg-blue-500' : 'bg-slate-600'}`}>
              <Text className="text-white text-xl">Kelvin</Text>
            </Pressable>

          </View>
        </View>

        <View className="items-center gap-2">
          <Text className="text-white text-xl">{t("settings.time_format")}</Text>
          <View className="flex-row">
            <Pressable onPress={() => setTimeFormat('12Hours')} className={`rounded-l-xl border-r border-slate-400 py-2 px-4 ${timeFormatLocal === '12Hours' ? 'bg-blue-500' : 'bg-slate-600'}`}>
              <Text className="text-white text-xl">12 {t('settings.hours')}</Text>
            </Pressable>
            <Pressable onPress={() => setTimeFormat('24Hours')} className={`rounded-r-xl py-2 px-4 ${timeFormatLocal === '24Hours' ? 'bg-blue-500' : 'bg-slate-600'}`}>
              <Text className="text-white text-xl">24 {t('settings.hours')}</Text>
            </Pressable>
          </View>
        </View>

        {((languageLocal !== languageGlobal) || (metricsLocal !== unitNameGlobal) || (timeFormatLocal !== timeFormatGlobal)) && (
          <View className="items-center">
              <Pressable onPress={() => handleApplyChangeSettings()} className="rounded-xl py-2 px-4 bg-blue-500">
                <Text className="text-white text-xl">Apply Changes</Text>
              </Pressable>
          </View>
        )}

      </View>
    </ScreenLayout>
  );
}

const {
  AndroidConfig,
  withAndroidManifest,
} = require('@expo/config-plugins');

const { addMetaDataItemToMainApplication, getMainApplicationOrThrow } = AndroidConfig.Manifest;

function withAdmobNativeAdsManifest(config, props) {
  return withAndroidManifest(config, (config) => {
    config.modResults = setAdmobNativeAdsConfig(config.modResults, props);
    return config;
  });
};

function setAdmobNativeAdsConfig(androidManifest, props) {
  let mainApplication = getMainApplicationOrThrow(androidManifest);
  addMetaDataItemToMainApplication(
      mainApplication,
      // value for `android:name`
      'com.google.android.gms.ads.APPLICATION_ID',
      // value for `android:value`
      props.androidAppId
  );

  return androidManifest;
}

/**
 * Apply react-native-fbads configuration for Expo SDK 44 projects.
 */
function withAdmobNativeAdsAndroid(config, props) {
  return withAdmobNativeAdsManifest(config, props);
};

module.exports = withAdmobNativeAdsAndroid;
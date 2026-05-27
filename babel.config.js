/**
 * babel.config.js
 *
 * Used by Jest (npm test). Metro (Expo bundler) ignores this file and resolves
 * expo/internal/babel-preset automatically with its own caller context.
 *
 * We use babel-preset-expo (via expo/internal/babel-preset which re-exports it)
 * with reanimated: false so the preset does NOT try to load
 * react-native-reanimated/plugin → react-native-worklets/plugin, which is an
 * optional native package that is not installed in this project.
 *
 * All other preset behaviour (TypeScript, JSX, Flow stripping, module transforms)
 * is handled by babel-preset-expo normally.
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        require('expo/internal/babel-preset'),
        // Disable the reanimated babel plugin — DineLog does not use Reanimated
        // directly, so this is safe for both app code and test transforms.
        { reanimated: false },
      ],
    ],
  };
};

module.exports = {
  preset: "ts-jest",
  verbose: true,
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__tests__/setup/assetsTransformer.js",
    "\\.(css|less)$": "<rootDir>/__tests__/setup/assetsTransformer.js",
  },
  testPathIgnorePatterns: ["<rootDir>/__tests__/setup/"],
};

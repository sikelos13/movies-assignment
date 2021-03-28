
module.exports = {
    "preset": "ts-jest",
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "transform": {
        "^.+\\.js$": "babel-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "setupFilesAfterEnv": ["./src/setupTests.ts"],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
      ]
  }
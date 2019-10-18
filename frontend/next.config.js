// module.exports = {
//   webpack(config, options) {
//     config.module.rules.push({
//       test: /\.(mjs|jsx?)$/,
//       exclude: /node_modules\/(?!(formol)\/).*/, // <- this line allows formol
//       use: {
//         //    to be built alongside
//         loader: 'babel-loader', //    your project
//       },
//       options: {
//         presets: [
//           '@babel/preset-react',
//           [
//             '@babel/preset-env',
//             {
//               targets: { browsers: 'last 1 version and > 3%' },
//               modules: false,
//             },
//           ],
//         ],
//         plugins: [
//           // <- these plugins are needed to build formol
//           '@babel/plugin-syntax-dynamic-import',
//           ['@babel/plugin-proposal-decorators', { legacy: true }],
//           'add-react-static-displayname',
//           ['@babel/plugin-proposal-class-properties', { loose: true }],
//         ],
//       },
//     })

//     // config.module.resolve = {
//     //   // <- these extensions needed to be loaded by webpack
//     //   extensions: ['.mjs', '.js', '.jsx'],
//     //}

//     return config
//   },
// }

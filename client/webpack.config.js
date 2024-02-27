const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js", // if you have multiple entry point (in this case main and install),
      //then you Make sure that each entry point specifies a unique output filename for its assets.
      //You can use placeholders like [name] or [contenthash] in the output filename to ensure uniqueness.
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Webpack plugin that generates our html file and injects our bundles.
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor",
      }),
      // Injects our custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Jate Text Editor",
        short_name: "Jate",
        description: "Text Editor",
        background_color: "#000000",
        theme_color: "#000000",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
          {
            src: path.resolve("./favicon.ico"),
            sizes: [96],
            destination: path.join("./"),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};

/*
let injectManifestCalled = false;

const plugins = [
  // Creates a manifest.json file.
  new WebpackPwaManifest({
    fingerprints: false,
    inject: true,
    name: "Jate Text Editor",
    short_name: "Jate",
    description: "Text Editor",
    background_color: "#000000",
    theme_color: "#000000",
    start_url: "./",
    publicPath: "./",
    icons: [
      {
        src: path.resolve("src/images/logo.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons"),
      },
    ],
  }),
  // Webpack plugin that generates our html file and injects our bundles. 
  new HtmlWebpackPlugin({
    template: "./index.html",
    title: "Contact Cards",
  }),
];
if (!injectManifestCalled) {
  // Injects custom service worker
  plugins.push(
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'service-worker.js',
    })
  );
  injectManifestCalled = true;
}

*/

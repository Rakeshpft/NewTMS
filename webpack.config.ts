import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import path from "path";

interface Configuration extends WebpackConfiguration {
  devServer?: DevServerConfiguration;
}

export default (_env: Record<string, any>, argv: any): Configuration => ({
  entry: "./src/index.tsx",
  devtool: argv.mode === "production" ? undefined : "inline-source-map",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devServer: {
    host: "localhost",
    compress: true,
    static: path.join(__dirname, "public"),
    server: "http",
    port: 4100,
    historyApiFallback: true,
  },
  module: {
    unsafeCache: false,
    rules: [
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // {
      //   test: /\.svg$/i,
      //   issuer: /\.[jt]sx?$/,
      //   use: ["@svgr/webpack"],
      // },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: "ts-loader",
      },

      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: "svg-url-loader", // or 'file-loader' if you chose that
      //       options: {
      //         limit: 8192, // You can adjust the limit as per your requirements
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  plugins: [
  
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Caching",
      filename: "index.html",
      template: "./src/index.html",
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "all.css",
    }),
    
  ],
});

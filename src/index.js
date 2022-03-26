import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./app/store";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductFeature from "./features/Product";
import NotFound from "./components/NotFound";
import ListPage from "./features/Product/pages/ListPage";
import DetailProduct from "./features/Product/pages/DetailProduct";
import ProductMenu from "./features/Product/components/ProductMenu";
import ProductDesciption from "./features/Product/components/ProductDesciption";
import ProductInformation from "./features/Product/components/ProductInformation";
import ProductReview from "./features/Product/components/ProductReview";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="products/*" element={<ProductFeature />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

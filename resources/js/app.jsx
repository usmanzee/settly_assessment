import "./bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/app.css";
import "../css/custom.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-toastify/dist/ReactToastify.css";

import ReactDOM from "react-dom/client";
import Main from "./Main";

import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/Provider";

ReactDOM.createRoot(document.getElementById("app")).render(
    <GlobalProvider>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </GlobalProvider>
);

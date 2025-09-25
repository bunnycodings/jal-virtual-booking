import { LoadingIndicator } from "components/LoadingIndicator/LoadingIndicator";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
    const [urlParams] = useSearchParams();
    const jalId = urlParams.get("JALID");

    const { signIn } = useContext(AuthContext);
    const { signed, token } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (signed) {
            const redirectPath = urlParams.get("redirect") || "/";
            navigate(redirectPath, { replace: true });
        }
    }, [signed, urlParams, navigate]);

    useEffect(() => {
        if (token) {
            return;
        }

        const redirectUrlParam = urlParams.get("redirect");
        if (redirectUrlParam && redirectUrlParam.indexOf("JALID") !== -1) {
            /*
                Se o servidor estiver rodando em localhost:3000, o site de login da JAL Virtual irá redirecionar com uma query inválida
                Ex: new URLSearchParams(window.location.search).get("redirect") = /?JALID=error
            */
            throw new Error(`The JAL Virtual Login service rejected the request. The server is in jalvirtual.com domain? Token query: ${redirectUrlParam}`);
        }

        if (jalId) {
            signIn(jalId);
            return;
        }

        let locationState: { from?: Location } | null = null;
        if (typeof location.state === "object") {
            locationState = location.state;
        }

        const jalLoginUrl = "https://crew.jalvirtual.com/login?url={url}";
        const baseUrl = window.location.href;
        let loginUrl = jalLoginUrl.replace("{url}", `${baseUrl}`);

        const redirectPath = locationState?.from?.pathname;
        if (redirectPath) {
            loginUrl += "?redirect=" + redirectPath;
        }

        window.location.href = loginUrl;
    }, [jalId, urlParams, signIn, token, location.state]);

    return (
        <LoadingIndicator />
    );
}

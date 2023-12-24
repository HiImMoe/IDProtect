import { useSearchParams } from "react-router-dom";

const Body = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const submit = async () => {
    const state = searchParams.get("state");
    // http://localhost:3001/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A3200%2Foauth&client_id=probonio&response_type=code&state=vKzH6LvZo0&scope=email%20profile%20openid%20offline_access&code_challenge=7U_c1_UFHWqSt3aC3Se2yJ1N1hYGXB3ayC3Mbt5ejbw&code_challenge_method=S256
    const redirect_uri = searchParams.get("redirect_uri");
    const client_id = searchParams.get("client_id");
    const code_challenge = searchParams.get("code_challenge");
    const code_challenge_method = searchParams.get("code_challenge_method");
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({
        email: "",
        password: "",
        redirect_uri,
        client_id,
        code_challenge,
        code_challenge_method,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    console.log(body);
    window.location.replace(
      `http://localhost:3200/oauth?state=${state}&code=${body.authCode}`
    );
  };
  return (
    <div className="Body">
      <input />
      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default Body;

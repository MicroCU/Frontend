import { useParams } from "next/navigation";

const OAuthCallBack = () => {
  const params = useParams();
  return (
    <div>
      <h1>OAuthCallBack</h1>
      <h1>{JSON.stringify(params)}</h1>
    </div>
  );
};
export default OAuthCallBack;

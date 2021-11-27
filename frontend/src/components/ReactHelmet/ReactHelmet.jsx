import { Helmet } from "react-helmet";

const ReactHelmet = ({ titleName }) => {
  return (
    <Helmet>
      <title>{titleName}</title>
    </Helmet>
  );
};

export default ReactHelmet;

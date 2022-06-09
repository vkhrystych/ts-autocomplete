import "./Loader.scss";

import { ILoaderProps } from "./LoaderTypes";

const Loader = ({ additionalClassName }: ILoaderProps): JSX.Element => (
  <div className={`loader ${additionalClassName || ""}`} />
);

export default Loader;

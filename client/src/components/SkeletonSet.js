import Wrapper from "../assets/wrappers/SkeletonSet";
// import { useAppContext } from "../context/appContext";

const SkeletonSet = () => {

  return (
    <Wrapper>
      <div className="skeleton-elements">
        <div className="skeleton-h3" />
        <div className="skeleton-p" />
      </div>
    </Wrapper>
  )
}

export default SkeletonSet;

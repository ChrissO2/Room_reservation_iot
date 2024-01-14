import styled from "styled-components";
import globalColors from "../../assets/globalColors";

export const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  margin-top: -5vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BannerContainer = styled.div`
  height: 10vh;
  font-size: 3rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ConfirmButton = styled.button`
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 10px 20px;
  font-size: 16px;
  width: 75%;
  font-weight: 600;
  margin-top: 3rem;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  transition: 0.2s ease-in-out;

  @media only screen and (min-width: 2160px) {
    font-size: 2rem;
  }
  &:hover {
    background-color: #1e90ff;
    opacity: 0.8;
  }
`;

export const RequestStatusLabel = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const LoadingAnimation = styled.div`
  position: absolute;
  border: 0.5rem solid #f3f3f3;
  border-top: 0.5rem solid #1e90ff;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  margin-bottom: 3rem;
  margin-top: 3rem;
  background-color: ${globalColors.main};
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

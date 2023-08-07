// This HOC component is built for using 'useNavigate' in class-based components.
import { useNavigate } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    
    return (
      <Component
        navigate={navigate}
        {...props}
        />
    );
  };
  
  return Wrapper;
};
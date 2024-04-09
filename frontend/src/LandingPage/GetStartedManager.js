import "./GetStartedButton.css";
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'react-bootstrap-icons';

const GetStartedButton = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/enterpassword');
    };

    return (
        <div className="OrderButtonLanding">
            <div className="d-grid gap-2 col-4 mx-auto">
                <button type="submit" className="btn rounded-pill px-2 py-3 btn-primary" onClick={handleClick}>
                    <ArrowRight color="white" size={48} />
                    <span className="mx-2">Login as Supervisor</span>
                </button>
            </div>
            <div className="line-separator my-5"></div>
        </div>
    );
}
 
export default GetStartedButton;

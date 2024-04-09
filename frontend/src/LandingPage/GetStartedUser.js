import "./GetStartedButton.css";
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'react-bootstrap-icons';

const GetStartedButton = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/selectlot');
    };

    return (
        <div className="OrderButtonLanding">
            <div className="d-grid gap-2 col-4 mx-auto">
                <button type="submit" className="btn orderNowButton rounded-pill p-2 btn-primary" onClick={handleClick}>
                    <ArrowRight color="white" size={48} />
                    <span>Login as Gate Staff</span>
                </button>
            </div>
            <div className="line-separator mb-5"></div>
        </div>
    );
}
 
export default GetStartedButton;

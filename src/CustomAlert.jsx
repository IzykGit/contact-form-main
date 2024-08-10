import './CustomAlert.css';

const CustomAlert = () => {
    return (
        <div className="custom-alert-overlay">
            <div className="custom-alert">
                <p><img src='/assets/images/icon-success-check.svg' alt=''/>Message Sent!</p>
                <p>{`Thanks for completing the form. We'll be in touch soon!`}</p>
            </div>
        </div>
    );
};

export default CustomAlert;

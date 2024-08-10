import { useState } from "react"
import CustomAlert from "./CustomAlert"
import "./App.css"


const App = () => {

    const [inputFields, setInputFields] = useState({
        firstName: "",
        lastName: "",
        email: "",
        general: false,
        support: false,
        message: "",
        consent: false
    })

    const [emptyFields, setEmptyFields] = useState([])

    const handleInputChange = (e, key) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setInputFields(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const invalidKeys = Object.keys(inputFields).filter(key => {
            return inputFields[key] === "" || inputFields[key] === false;
        });

        setEmptyFields(invalidKeys)

        if(invalidKeys.length > 1) {
            return
        }
        if(!inputFields.consent) {
            return;
        }


        showAlert()
        setInputFields({
            firstName: "",
            lastName: "",
            email: "",
            general: false,
            support: false,
            message: "",
            consent: false
        })
    }

    const isError = (fieldName) => emptyFields.includes(fieldName);


    const [alertVisible, setAlertVisible] = useState(false);

    const showAlert = () => {
        setAlertVisible(true);
    };


    return (
        <>
        {alertVisible && <CustomAlert />}
        <form onSubmit={handleSubmit}>
            <h1>Contact Us</h1>


            <div className="input-grid">

                <div className="first-name">
                    <label htmlFor="first-name">First Name *</label>
                    <input type="text" name="first-name" id="first-name"
                    value={inputFields.firstName}
                    onChange={(e) => handleInputChange(e, 'firstName')}/>

                    {isError('firstName') && <span className="error">This field is required</span>}
                </div>

                <div className="last-name">
                    <label htmlFor="last-name">Last Name *</label>
                    <input type="text" name="last-name" id="last-name"
                    value={inputFields.lastName} 
                    onChange={(e) => handleInputChange(e, 'lastName')}/>

                    {isError('lastName') && <span className="error">This field is required</span>}
                </div>

                <div className="email">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" name="email" id="email"
                    value={inputFields.email}
                    onChange={(e) => handleInputChange(e, 'email')}/>

                    {isError('email') && <span className="error">Please enter a valid email address</span>}
                </div>



                <div className="general-support">
                    <p>Query Type *</p>

                    <div>
                        <div>
                            <input type="checkbox" name="general" id="general" className="checkbox"
                            checked={inputFields.general}
                            onChange={(e) => {
                                if (inputFields.support) return
                                handleInputChange(e, "general")
                            }}/>

                            <label htmlFor="general">General Enquiry</label>
                        </div>

                        <div>
                            <input type="checkbox" name="support" id="support"
                            checked={inputFields.support} className="checkbox"
                            onChange={(e) => {
                                if (inputFields.general) return
                                handleInputChange(e, "support")
                            }}/>
                            <label htmlFor="support">Support Request</label>
                        </div>

                        
                    </div>


                    {isError('consent') && <span className="error">Please select a query type</span>}
                </div>

                <div className="message">
                    <label htmlFor="message">Message *</label>
                    <textarea value={inputFields.message} id="message" name="message"
                    onChange={(e) => handleInputChange(e, "message")}/>

                    {isError('consent') && <span className="error">This field is required</span>}
                </div>

                <div className="consent">

                    <div>
                        <input type="checkbox" name="consent" id="consent" className="checkbox"
                        checked={inputFields.consent} onChange={(e) => handleInputChange(e, "consent")}/>
                        <p>I consent to being contacted by the team *</p>
                    </div>

                    {isError('consent') && <span className="error">To submit this form, please consent to being contacted</span>}
                </div>
            </div>
            
            <button type="submit" className="submit">Submit</button>
        </form>
        </>
    )
}

export default App
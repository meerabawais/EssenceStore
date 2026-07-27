export default function BillingForm({formData, setFormData}){
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]:value
        }));
    }
    return(
        <>
            <div className="cart-page-heading mb-30">
                            <h5>Billing Address</h5>
                        </div>

                        <form action="#" method="post">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="first_name">First Name <span>*</span></label>
                                    <input type="text" className="form-control" id="first_name" name="firstName" value={formData.firstName} onChange={handleChange} required/>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="last_name">Last Name <span>*</span></label>
                                    <input type="text" className="form-control" id="last_name" name="lastName" value={formData.lastName} onChange={handleChange} required/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="company">Company Name</label>
                                    <input type="text" className="form-control" id="company" name="company" value={formData.company} onChange={handleChange}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="country">Country <span>*</span></label>
                                    <select className="form-control" id="country" name="country" value={formData.country} onChange={handleChange}>
                                        <option value="United States">United States</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Germany">Germany</option>
                                        <option value="France">France</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="Canada">Canada</option>
                                    </select>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="street_address">Address <span>*</span></label>
                                    <input type="text" className="form-control mb-3" id="street_address" name="streetAddress" value={formData.streetAddress} onChange={handleChange}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="postcode">Postcode <span>*</span></label>
                                    <input type="text" className="form-control" id="postcode" name="zipCode" value={formData.zipCode} onChange={handleChange}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="city">Town/City <span>*</span></label>
                                    <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="province">Province <span>*</span></label>
                                    <input type="text" className="form-control" id="province" name="province" value={formData.province} onChange={handleChange}/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="phone_number">Phone No <span>*</span></label>
                                    <input type="number" className="form-control" id="phone_number" min={0} name="phone" value={formData.phone} onChange={handleChange}/>
                                </div>
                                <div className="col-12 mb-4">
                                    <label htmlFor="email_address">Email Address <span>*</span></label>
                                    <input type="email" className="form-control" id="email_address" name="email" value={formData.email} onChange={handleChange}/>
                                </div>

                                <div className="col-12">
                                    <div className="custom-control custom-checkbox d-block mb-2">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                        <label className="custom-control-label" htmlFor="customCheck1">Terms and conitions</label>
                                    </div>
                                    <div className="custom-control custom-checkbox d-block mb-2">
                                        <input type="checkbox" className="custom-control-input" id="customCheck2"/>
                                        <label className="custom-control-label" htmlFor="customCheck2">Create an accout</label>
                                    </div>
                                    <div className="custom-control custom-checkbox d-block">
                                        <input type="checkbox" className="custom-control-input" id="customCheck3"/>
                                        <label className="custom-control-label" htmlFor="customCheck3">Subscribe to our newsletter</label>
                                    </div>
                                </div>
                            </div>
                        </form>
        </>

    )
}
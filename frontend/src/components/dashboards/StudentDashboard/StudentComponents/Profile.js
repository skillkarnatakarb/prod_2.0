import React, { useState, useEffect } from "react";
import "../StudentDashboard.css";
import { fetchStuProfile, updateStuProfile } from "../../../../api/api";

const Profile = () => {
  const [profile, setProfile] = useState(null); // Store profile data
  const [errors, setErrors] = useState({});    // Store form validation errors
  const [loading, setLoading] = useState(true); // Manage loading state
  const [isEditing, setIsEditing] = useState(false); // Toggle editing mode

  // State options
  const states = {
    Maharashtra: ["Mumbai", "Pune"],
    Gujarat: ["Ahmedabad", "Surat"],
    Karnataka: ["Bengaluru", "Mysuru"],
    TamilNadu: ["Chennai", "Coimbatore"],
  };

  const districts = {
    Maharashtra: ["Mumbai District", "Pune District"],
    Gujarat: ["Ahmedabad District", "Surat District"],
    Karnataka: ["Bengaluru District", "Mysuru District"],
    TamilNadu: ["Chennai District", "Coimbatore District"],
  };

  const cities = {
    "Mumbai District": ["Andheri", "Borivali", "Dadar"],
    "Pune District": ["Shivajinagar", "Kothrud", "Hadapsar"],
    "Ahmedabad District": ["Navrangpura", "Maninagar"],
    "Surat District": ["Adajan", "Katargam"],
    "Bengaluru District": ["Whitefield", "Indiranagar"],
    "Mysuru District": ["Jayalakshmipuram", "Vijayanagar"],
    "Chennai District": ["T. Nagar", "Guindy"],
    "Coimbatore District": ["RS Puram", "Ganapathy"],
  };

  const qualifications = {
    BCA: ["Computer Science", "IT"],
    BSc: ["PCM", "PCB", "EMCS"],
    BBA: ["Finance", "Marketing", "HR"],
    BCom: ["Accounting", "Taxation", "Banking"],
  };

  // Fetch profile on component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchStuProfile();
        setProfile(data);
      } catch (err) {
        setErrors("No profile found.");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validation logic
  const validate = () => {
    const validationErrors = {};
    if (!profile.firstName) validationErrors.firstName = "First name is required.";
    if (!profile.lastName) validationErrors.lastName = "Last name is required.";
    if (!profile.dob) validationErrors.dob = "Date of birth is required.";
    if (!profile.phoneNumber || !/^\d{10}$/.test(profile.phoneNumber)) {
      validationErrors.phoneNumber = "Phone number must be 10 digits.";
    }
    if (!profile.email || !/\S+@\S+\.\S+/.test(profile.email)) {
      validationErrors.email = "Valid email is required.";
    }
    if (!profile.address) validationErrors.address = "Address is required.";
    if (!profile.state) validationErrors.state = "State is required.";
    if (!profile.district) validationErrors.district = "District is required.";
    if (!profile.city) validationErrors.city = "City is required.";
    if (!profile.pincode || !/^\d{6}$/.test(profile.pincode)) {
      validationErrors.pincode = "Pincode must be 6 digits.";
    }
    if (!profile.qualification) validationErrors.qualification = "Qualification is required.";
    if (!profile.specialization) validationErrors.specialization = "Specialization is required.";
    if (!profile.collegeName) validationErrors.collegeName = "College name is required.";
    if (!profile.yearOfPassing || !/^\d{4}$/.test(profile.yearOfPassing)) {
      validationErrors.yearOfPassing = "Year of passing must be a 4-digit year.";
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const updatedProfile = await updateStuProfile(profile);
        setProfile(updatedProfile);
        setIsEditing(false);
        alert("Profile updated successfully!");
      } catch (err) {
        console.error("Error updating profile:", err.message);
        alert("Error updating profile. Please try again.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile found.</div>;
  }

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Personal Details</h2>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {errors.dob && <span className="error">{errors.dob}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}
        </div>
        <h2>Address</h2>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div>
          <label>State:</label>
          <select
            name="state"
            value={profile.state}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="">Select State</option>
            {Object.keys(states).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <span className="error">{errors.state}</span>}
        </div>

        <div>
          <label>District:</label>
          <select
            name="district"
            value={profile.district}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="">Select District</option>
            {profile.state &&
              districts[profile.state].map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </select>
          {errors.district && <span className="error">{errors.district}</span>}
        </div>

       <div>
          <label>City:</label>
          <select 
            name="city"
            value={profile.city}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="">Select City</option>
            {profile.district &&
              cities[profile.district].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))} 
          </select>
          {errors.city && <span className="error">{errors.city}</span>} 
        </div>

        <div>
          <label>Pincode:</label>
          <input  
            type="text"
            name="pincode"            
            value={profile.pincode}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {errors.pincode && <span className="error">{errors.pincode}</span>}
        </div>

        <h2>Qualifications</h2>
        <div>
          <label>Qualification:</label> 
          <select
            name="qualification"            
            value={profile.qualification}
            onChange={handleInputChange}
            disabled={!isEditing}
          > 
            <option value="">Select Qualification</option>
            {Object.keys(qualifications).map((qualification) => (
              <option key={qualification} value={qualification}>
                {qualification}
              </option>
            ))}
          </select>
          {errors.qualification && (  
            <span className="error">{errors.qualification}</span>
          )}
        </div>

        <div>
          <label>Specialization:</label>
          <input
            type="text"
            name="specialization"            
            value={profile.specialization}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {errors.specialization && (
            <span className="error">{errors.specialization}</span>
          )}
        </div>

        <div>
          <label>College Name:</label>
          <input
            type="text"
            name="collegeName"            
            value={profile.collegeName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {errors.collegeName && (
            <span className="error">{errors.collegeName}</span>
          )}
        </div>

        <div>
          <label>Year of Passing:</label>
          <input
            type="text"
            name="yearOfPassing"            
            value={profile.yearOfPassing}
            onChange={handleInputChange}
            disabled={!isEditing}
          />  
          {errors.yearOfPassing && (
            <span className="error">{errors.yearOfPassing}</span>
          )}
        </div>

        <div>
          <label>Percentage:</label>
          <input
            type="text"
            name="percentage"            
            value={profile.percentage}
            onChange={handleInputChange}
            disabled={!isEditing} 
          />    
          {errors.percentage && (
            <span className="error">{errors.percentage}</span>  
          )}
        </div>
        {/* social links. */}
        <h2>Social Links</h2>
        <div>
          <label>LinkedIn:</label>
          <input
            type="text"
            name="linkedin"
            value={profile.linkedin}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>GitHub:</label>
          <input
            type="text"
            name="github"
            value={profile.github} 
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Twitter:</label>
          <input
            type="text"
            name="twitter"
            value={profile.twitter}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Resume link:</label>
          <input
            type="text"
            name="resumeLink"
            value={profile.resumeLink}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
    
        <div>
          <button type="button" onClick={handleEdit}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && <button type="submit">Save</button>}
        </div>
      </form>
    </div>
  );
};

export default Profile;

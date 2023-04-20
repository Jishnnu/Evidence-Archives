import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import axios from 'axios';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'
});

function MyForm() {
  const [timeRange, setTimeRange] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [fileUrl, setFileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = async (e) => {
    let isValid = true;
    const errors = {};

    e.preventDefault();

    const timeRangeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]-(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9] (0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (!timeRangeRegex.test(timeRange)) {
      // The time range is not in the correct format      
      errors.timeRange = "Please enter a valid time range in 24 hour format";
      isValid = false;
    }

    if (place === "" || description === "" || file === "") {
      // One or more of the required fields are empty
      alert("Mandatory Fields Empty");
      errors.place = "Mandatory Fields Empty";
      isValid = false;
    }

    setErrors(errors);
    alert(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('timeRange', timeRange);
    formData.append('place', place);
    formData.append('description', description);
    formData.append('name', name);
    formData.append('address', address);
    formData.append('contactNumber', phone);
    formData.append('email', email);

    if (validate()) {
      try {
        alert("Please wait. This might take some time.");
        setIsLoading(true);
        const response = await axiosInstance.post('/upload', formData);
        console.log(response.data.url);
        setFileUrl(response.data.url);

        alert('Data uploaded successfully');

        setTimeRange("");
        setPlace("");
        setDescription("");
        setFile("");
        setName("");
        setAddress("");
        setPhone("");
        setEmail("");

        window.location.href = '/thankyou'

      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false); // Set loading state to false after the request completes
      }
    }
  };

  return (
    <>
      <div className="dark-form">
        <div className="background">
          <h1>Welcome To Evidence Archives</h1>
          <h5><i>Please fill out this form to upload evidence</i></h5> <br></br>

          <div
            style={{
              border: "5px solid black",
              marginTop: "20px",
              marginLeft: "200px",
              marginRight: "200px",
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formTimeRange">
                <Form.Label>
                  Time Range <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter time range in 24-hour format with the date (Eg:- 09:00-15:00 25-04-2023)"
                  required
                  minLength={11}
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPlace">
                <Form.Label>
                  <br></br>Place <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter a valid place name (2-50 characters) - Locality, City, State"
                  minLength={2}
                  maxLength={50}
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>
                  <br></br>Description <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter a clear description of the event being reported (10-500 characters)"
                  required
                  minLength={10}
                  maxLength={500}
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formFile">
                <Form.Label>
                  <br></br>Upload Evidence <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  required
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.mp4,.avi,.mov,.mkv,.mp3,.wav,.aac,.xls,.xlsx,.ppt,.pptx"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>

              <br></br>
              <Form.Group controlId="formUploaderDetails">
                <Form.Label><br></br>Details of Uploader (Optional)</Form.Label>
                <Form.Control type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} /><br></br>
                <Form.Control type="text" placeholder="Your Address" value={address} onChange={(e) => setAddress(e.target.value)} /><br></br>
                <Form.Control type="phone" pattern="[0-9]{10}" placeholder="Your Contact Number" value={phone} onChange={(e) => setPhone(e.target.value)} /><br></br>
                <Form.Control type="email" placeholder="Your Email ID" value={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <br></br>
              <Button variant="success" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Spinner animation="border" role="status"> {/* Show the spinner during loading state */}
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : (
                  'Submit' // Show the normal text on the submit button
                )}
              </Button> <br></br>
            </Form>

            {fileUrl && <img src={fileUrl} alt="Uploaded file" />}
          </div>
          <br></br>
        </div>
      </div>
    </>
  );
}

export default MyForm;
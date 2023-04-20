import { Form, Table, Button, Spinner } from "react-bootstrap";
import React, { useState, } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'
});

function Search() {
  const [searchText, setSearchText] = useState("");
  const [files, setFiles] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setFiles([]);
    setErrorMessage("");
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    setFiles([]);
    setIsButtonClicked(false);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true); // Set loading state to true
      setFiles([]);
      setErrorMessage("");
      const response = await axiosInstance.post('/search', { searchText: searchText });
      setFiles(response.data);
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error occurred while searching.");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleReset = () => {
    setSearchText("");
    setFiles([]);
    setIsButtonClicked(false);
    setErrorMessage("");
  };

  return (
    <div className="table">
      <div className="login">
        <h1 className="mb-4">SEARCH</h1>
        <Form onSubmit={handleSearch}>
          <Form.Group>
            <Form.Label> Search Public Evidence Database </Form.Label> <br></br>
            <Form.Control
              type="text"
              placeholder="Enter Crime Details"
              required
              minLength={3}
              value={searchText}
              onChange={handleInputChange}
            />
          </Form.Group>

          <br></br>
          <Button variant="success" type="submit" name="Search" onClick={handleButtonClick}>
            Search
          </Button> &emsp;
          <Button variant="secondary" type="button" name="Reset" onClick={handleReset}>
            Reset
          </Button>
        </Form>

        <br></br>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : files.length > 0 && isButtonClicked ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Metadata</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.url}>
                <td>{file.name}</td>
                <td>{JSON.stringify(file.metadata)}</td>
                <td>
                  <a href={file.url} target="_blank" rel="noreferrer">
                    Click to Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        files.length === 0 && isButtonClicked && searchText.length > 0 ? (
          <h3>No Entries</h3>
        ) : errorMessage ? (
          <h3>{errorMessage}</h3>
        ) : null
      )}
    </div>
  );
}

export default Search;
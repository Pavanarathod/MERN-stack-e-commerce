import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyWord, setKeyword] = useState("");

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    if (keyWord.trim()) {
      navigate(`/search/${keyWord}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Form.Control
        type="text"
        name="q"
        value={keyWord}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products"
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2 m-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;

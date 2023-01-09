import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { BiPlus } from "react-icons/bi";

const AddMessages = () => {
  const [newMssg, setnewMssg] = useState({
    to: "",
    body: "",
  });

  const { to, body } = newMssg;
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/parents`);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let data = await response.json();
        setStudents(data);
      } catch (err) {
        setStudents(null);
      }
    };
    getStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    await createMssg();
    await setTimeout(() => {
      router.reload();
    }, 0.5 * 1000);
  };

  const createMssg = async () => {
    try {
      await fetch("http://localhost:3000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMssg),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewMssg({ ...newMssg, [name]: value });
  };
  return (
    <div className="formContainer">
      <div>
        {isSubmit ? (
          <Loader active inline="centered" />
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <span>to: </span>
              <select name="to" onChange={handleChange}>
                <option>select student</option>
                {students.map((result) => (
                  <option>{result.firstName + " " + result.lastName}</option>
                ))}
              </select>
            </div>
            <Form.Input
              className="inputContainer"
              label="Body"
              placeholder="Body"
              name="body"
              onChange={handleChange}
              value={body}
              autoFocus
            />
            <div className="submitBtn">
              <button>
                {"Add"}
                <span>
                  <BiPlus size={20}></BiPlus>
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddMessages;

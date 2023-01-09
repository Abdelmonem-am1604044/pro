import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { BiPlus } from "react-icons/bi";

const AddChild = () => {
  const [newChild, setnewChild] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    schoolGrade: "",
  });

  const { firstName, lastName, dob, gender, schoolGrade } = newChild;
  const { push, query } = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    let errors = {};
    if (!firstName) {
      errors.firstName = "firstName is Required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    await createChild();
    await setTimeout(() => {
      router.reload();
    }, 0.5 * 1000);
  };


  const createChild = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("loggedUser"));
      user.students.push(newChild);
      localStorage.setItem("loggedUser", JSON.stringify(user));

      await fetch(`http://localhost:3000/api/parents${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChild),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewChild({ ...newChild, [name]: value });
  };
  return (
    <div className="formContainer">
      <div>
        {isSubmit ? (
          <Loader active inline="centered" />
        ) : (
          <form onSubmit={handleSubmit}>
            <Form.Input
              className="inputContainer"
              label="Full name"
              placeholder="Enter full name"
              name="firstName"
              onChange={handleChange}
              value={firstName}
              autoFocus
            />
            <Form.Input
              className="inputContainer"
              label="Last name"
              placeholder="Last name"
              name="lastName"
              onChange={handleChange}
              value={lastName}
              autoFocus
            />
            <Form.Input
              type="date"
              className="inputContainer"
              label="	Date Of Birth"
              placeholder="	Date Of Birth"
              name="dob"
              onChange={handleChange}
              value={dob}
              autoFocus
            />
            <Form.Input
              className="inputContainer"
              label="Gender"
              placeholder="Gender"
              name="gender"
              onChange={handleChange}
              value={gender}
              autoFocus
            />
            <Form.Input
              className="inputContainer"
              label="Grade"
              placeholder="Grade"
              name="schoolGrade"
              onChange={handleChange}
              value={schoolGrade}
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

export default AddChild;

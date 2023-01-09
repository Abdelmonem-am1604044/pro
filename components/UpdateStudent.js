import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { BiPlus } from "react-icons/bi";

const UpdateStudent = () => {
  const [newStudent, setnewStudent] = useState({
    firstName: "",
    lastName: "",
    qatariId: "",
    mobileNumber: "",
    email: "",
    password: "",
    status: "",
  });

  const { push, query } = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmit(true);
    await updateStudent();
    await setTimeout(() => {
      router.reload();
    }, 0.5 * 1000);
  };

  const updateStudent = async () => {
    try {
      await fetch(
        `http://localhost:3000/api/parents/${localStorage.getItem("_id")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStudent),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewStudent({ ...newStudent, [name]: value });
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
              defaultValue={localStorage.getItem("firstName")}
              onChange={handleChange}
              autoFocus
            />
            <Form.Input
              className="inputContainer"
              label="Last name"
              placeholder="Last name"
              name="lastName"
              defaultValue={localStorage.getItem("lastName")}
              onChange={handleChange}
              autoFocus
            />
            <Form.Input
              className="inputContainer"
              label="Qatari Id"
              placeholder="Qatari Id"
              name="qatariId"
              defaultValue={localStorage.getItem("qatariId")}
              onChange={handleChange}
              autoFocus
            />
            <Form.Input
              className="inputContainer"
              label="Mobile number"
              placeholder="Mobile number"
              name="mobileNumber"
              defaultValue={localStorage.getItem("mobileNumber")}
              onChange={handleChange}
              autoFocus
            />
            <Form.Input
              className="inputContainer"
              label="Email"
              placeholder="Email"
              name="email"
              defaultValue={localStorage.getItem("email")}
              onChange={handleChange}
              autoFocus
            />
            <Form.Input
              className="inputContainer"
              label="Password"
              placeholder="Password"
              name="password"
              defaultValue={localStorage.getItem("password")}
              onChange={handleChange}
              autoFocus
            />
            <div className="formCheck">
              <div>
                <input
                  type="radio"
                  name="status"
                  placeholder="Status"
                  id="radioDefault1"
                  defaultValue={localStorage.getItem("status")}
                  onChange={handleChange}
                ></input>
                <label htmlFor="radioDefault1">Active</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="status"
                  placeholder="Status"
                  defaultValue={localStorage.getItem("status")}
                  id="radioDefault2"
                  onChange={handleChange}
                ></input>
                <label htmlFor="radioDefault1">Inactive</label>
              </div>
            </div>
            <div className="submitBtn">
              <button>
                {"Update"}
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

export default UpdateStudent;

// const getStudent = async () => {
//   console.log("query.id: " + query.id);
//   const response = await fetch(
//     `http://localhost:3000/api/students/${query.id}`
//   );
//   const data = await response.json();
//   setNewStudent({
//     firstName: data.firstName,
//     lastName: data.lastName,
//     qatariId: data.qatariId,
//     mobileNumber: data.mobileNumber,
//     email: data.email,
//     password: data.password,
//     status: data.status,
//   });
// };

// useEffect(() => {
//   if (query.id) getStudent();
// }, [query.id]);

// const updateStudent = async () => {
//   try {
//     await fetch(`http://localhost:3000/api/students/${query.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newStudent),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

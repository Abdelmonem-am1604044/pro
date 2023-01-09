import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { BiPlus } from "react-icons/bi";
import Surah from "../data/surah.json";
import Slider from "react-rangeslider";

const UpdateTaskForm = (_id) => {
  const [newTask, setnewTask] = useState({
    studentName: "",
    surahName: "",
    fromAya: "",
    toAya: "",
    dueDate: "",
    completedDate: "",
    type: "",
  });

  const {
    studentName,
    surahName,
    fromAya,
    toAya,
    dueDate,
    completedDate,
    type,
  } = newTask;
  const { push, query } = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState([]);
  const router = useRouter();

  const date = new Date();
  const futureDate = date.getDate() + 1;
  date.setDate(futureDate);
  const due = date.toLocaleDateString("en-CA");

  const validate = () => {
    let errors = {};
    if (!surahName) {
      errors.surahName = "surahName is Required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    await updateTask();
    // await setTimeout(() => {
    //   router.reload();
    // }, 0.5 * 1000);
  };

  const updateTask = async () => {
    try {
      await fetch(
        `http://localhost:3000/api/tasks/${localStorage.getItem("_id")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewTask({ ...newTask, [name]: value });
  };
  return (
    <div className="formContainer">
      <div>
        {isSubmit ? (
          <Loader active inline="centered" />
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <select
                name="studentName"
                onChange={handleChange}
                defaultValue={localStorage.getItem("studentName")}
              >
                <option>select student</option>
                {students.map((result) => (
                  <option>{result.firstName + " " + result.lastName}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="surahName"
                onChange={handleChange}
                defaultValue={localStorage.getItem("surahName")}
              >
                <option>selcet surah</option>
                {Surah.map((result) => (
                  <option>
                    {result.id}. {result.englishName} ({result.ayaCount})
                  </option>
                ))}
              </select>
            </div>
            <Form.Input
              type="range"
              min="1"
              className="inputContainer"
              label={"From Aya " + fromAya}
              placeholder="From Aya"
              name="fromAya"
              onChange={handleChange}
              defaultValue={localStorage.getItem("fromAya")}
              autoFocus
            />

            <Form.Input
              type="range"
              min={fromAya}
              className="inputContainer"
              label={"To aya " + toAya}
              placeholder="	To Aya"
              name="toAya"
              onChange={handleChange}
              defaultValue={localStorage.getItem("toAya")}
              autoFocus
            />
            <Form.Input
              className="inputContainer"
              label="	Due date"
              placeholder="Enter Due date"
              name="dueDate"
              type="date"
              defaultValue={localStorage.getItem("dueDate")}
              onChange={handleChange}
              autoFocus
            />
            <Form.Input
              className="inputContainer"
              label="Completed Date"
              placeholder="Enter 	Completed Date"
              name="completedDate"
              type="date"
              defaultValue={localStorage.getItem("completedDate")}
              onChange={handleChange}
              autoFocus
            />
            <div className="formCheck">
              <div>
                <input
                  type="radio"
                  name="type"
                  placeholder="Type"
                  defaultValue={localStorage.getItem("type")}
                  id="radioDefault1"
                  onChange={handleChange}
                ></input>
                <label htmlFor="radioDefault1">Memorization</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="type"
                  placeholder="Type"
                  value="Revision"
                  id="radioDefault2"
                  onChange={handleChange}
                  defaultValue={localStorage.getItem("type")}
                ></input>
                <label htmlFor="radioDefault1">Revision</label>
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

export default UpdateTaskForm;

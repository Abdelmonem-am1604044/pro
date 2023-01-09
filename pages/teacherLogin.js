import React from "react";
import { useRouter } from "next/router";

export default function teacherLogin() {
  const router = useRouter();

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" method="post">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign in as teacher</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              className="form-control mt-1"
              type="email"
              name="email"
              placeholder="Type your email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              className="form-control mt-1"
              type="password"
              name="password"
              placeholder="Type your password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={async (event) => {
                event.preventDefault();

                console.log(event.target.form[0].value);
                console.log(event.target.form[1].value);

                const response = await fetch(
                  `/api/login/teacher?email=${event.target.form[0].value}&password=${event.target.form[1].value}`,
                  {
                    method: "POST",
                  }
                );

                const data = await response.json();

                if (data?.user) {
                  localStorage.setItem(
                    "loggedUser",
                    JSON.stringify(data?.user)
                  );
                  router.push("/teacher");
                } else {
                  alert("No teacher");
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

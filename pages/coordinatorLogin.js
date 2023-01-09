import React from "react";
import { useRouter } from "next/router";

export default function coordinatorLogin() {
  const router = useRouter();
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" action="/api/login/coordinator" method="post">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In as Coordinator</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
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
                  `/api/login/coordinator?email=${event.target.form[0].value}&password=${event.target.form[1].value}`,
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
                  router.push("/coordinator");
                } else {
                  alert("No coordinator was found");
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

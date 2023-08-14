import React from "react";
import TextInput from "../TextInput";
import SubmitButton from "../SubmitButton";

function AdminForm() {
  return (
    <div className="w-full">
      <form action="" method="post" className="w-full">
        <TextInput
          name="AdminEmail"
          placeholder="enter the email of the new admin"
          title="Email"
          type="email"
        />
        <TextInput
          name="AdminPassword"
          placeholder="enter the Password of the new admin"
          title="Password"
          type="password"
        />
        <div className="w-full flex justify-center">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

export default AdminForm;

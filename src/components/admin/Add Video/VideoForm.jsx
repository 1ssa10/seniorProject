import React from "react";
import FileInput from "../FileInput";
import TextArea from "../TextArea";
import CategorySelect from "../CategorySelect";
import TextInput from "../TextInput";
import SubmitButton from "../SubmitButton";

function VideoForm() {
  return (
    <form action="" method="post" className="flex flex-col gap-8">
      <FileInput />
      <TextArea />
      <CategorySelect />
      <TextInput
        placeholder="Enter author name..."
        name="author"
        title="Author Name"
        type="text"
      />
      <SubmitButton />
    </form>
  );
}

export default VideoForm;

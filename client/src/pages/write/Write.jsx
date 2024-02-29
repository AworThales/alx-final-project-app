import { useContext, useState } from "react";
import people from "../../assets/people.jpg"
import "./write.scss";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [write, setWrite] = useState("");
  const [file, setFile] = useState(null);

  const {user} = useContext(Context)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const newPost = {
      title,
      desc: write,
      username: user.username,
    };

    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("/upload", data);
       } catch (err) {
         console.log(err);
       };
    };

    try {
      const res = await axios.post("/posts", newPost);
      console.log(res)
      window.location.replace("/post/" + res.data._id);
     } catch (err) {
       console.log(err);
     };
  };

  return (
    <div className='write'>
        {file && 
          <img className="writeImg" src={URL.createObjectURL(file)} alt="People" />
        }
      <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <span className="writeIcon"><ion-icon name="add-outline"></ion-icon></span>
                </label>
                <input 
                  type="file" 
                  id="fileInput" 
                  style={{display:"none"}} 
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <input 
                    type="text" 
                    placeholder="Title" 
                    className="writeInput" 
                    autoFocus={true}
                    onChange={(e)=>setTitle(e.target.value)}
                />
            </div>
            <div className="writeFormGroup">
                <textarea 
                    placeholder="Tell your story...." 
                    className="writeInput writeText"
                    onChange={(e)=>setWrite(e.target.value)}
                ></textarea>
            </div>
            <button type="submit" className="writeSubmit">Publish</button>
      </form>
    </div>
  )
}

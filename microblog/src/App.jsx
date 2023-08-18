import { useEffect, useState } from "react";
import { getBlog, saveNewPost } from "./services";
import { useFlag } from "./useFlag";
import Post from "./Post";

function App() {
  const [blog, setBlog] = useState([]);
  const [obsoleto, set, unset] = useFlag();
  useEffect(() => {
    getBlog().then(setBlog);
    return unset;
  }, [obsoleto]);

  const [postContent, setPostContent] = useState("");
  const addPost = (event) => {
    event.preventDefault();
    saveNewPost(postContent).then(set);
    setPostContent("");
  };

  return (
    <div className="App">
      <h1>Microblog personal</h1>
      <form onSubmit={addPost} className="new">
        <textarea
          value={postContent}
          placeholder="Nuevo post"
          onChange={(event) => setPostContent(event.target.value)}
        />
        <button type="submit">Publicar</button>
      </form>
      {blog.map((p) => (
        <Post {...p} key={p.id} onChange={set} />
      ))}
    </div>
  );
}

export default App;

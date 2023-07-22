//styles imports
import "./utilities/styles/stylesheet.scss";
import "./App.scss";

import EmailBody from "./components/emailBody/EmailBody";
import EmailList from "./components/emailList/EmailList";
import { useState } from "react";

function App() {
  const [emailList, setEmailList] = useState([]);
  const [openEmail, setOpenEmail] = useState(null);
  const [filter, setFilter] = useState("All");

  function handleFilter(key) {
    setFilter(key);
  }

  return (
    <>
      <h1 className='mb-4'>Super Email</h1>

      <section className='filter'>
        Filter By:
        <span
          className={filter === "unread" ? "active-filter" : ""}
          onClick={() => handleFilter("unread")}
        >
          Unread
        </span>
        <span
          className={filter === "read" ? "active-filter" : ""}
          onClick={() => handleFilter("read")}
        >
          Read
        </span>
        <span
          className={filter === "favorite" ? "active-filter" : ""}
          onClick={() => handleFilter("favorite")}
        >
          Favorites
        </span>
        {/* Added "all" filter considering ideal case although this was not in requirements */}
        <span
          className={filter === "All" ? "active-filter" : ""}
          onClick={() => handleFilter("All")}
        >
          All
        </span>
      </section>

      <main>
        <EmailList
          emailList={emailList}
          setEmailList={setEmailList}
          openEmail={openEmail}
          setOpenEmail={setOpenEmail}
          filter={filter}
        />

        {Boolean(openEmail) && (
          <EmailBody
            emailList={emailList}
            setEmailList={setEmailList}
            openEmail={openEmail}
            setOpenEmail={setOpenEmail}
          />
        )}
      </main>
    </>
  );
}

export default App;

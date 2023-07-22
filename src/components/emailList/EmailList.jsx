import React, { useCallback, useEffect, useState } from "react";
//css
import "./EmailList.scss";

import { getEmailListApi } from "../../api/emailList";
import ListArticle from "./ListArticle";

export default function EmailList({
  emailList,
  setEmailList,
  openEmail,
  setOpenEmail,
  filter,
}) {
  const [filterEmailList, setFilterEmailList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (filter === "read") {
      const readData = emailList?.filter((item) => item?.isRead);
      setFilterEmailList(readData);
    } else if (filter === "unread") {
      const unreadData = emailList?.filter((item) => !item?.isRead);
      setFilterEmailList(unreadData);
    } else if (filter === "favorite") {
      const favoriteData = emailList?.filter((item) => item?.isFavorite);
      setFilterEmailList(favoriteData);
    } else if (filter === "All") {
      setFilterEmailList(emailList);
    }
  }, [filter, emailList]);

  const cachedList = JSON.parse(localStorage.getItem(`emailList`));

  const getEmailList = useCallback(
    async (pageNum) => {
      setIsLoading(true);
      try {
        if (!cachedList?.length) {
          const { data } = await getEmailListApi(pageNum);
          const uiData = data?.list?.map((each) => ({
            ...each,
            date: new Date(each?.date),
            isRead: false,
            isFavorite: false,
          }));
          setEmailList(uiData);
          localStorage.setItem(`emailList`, JSON.stringify(uiData));
        } else {
          setEmailList(cachedList);
        }
      } catch (error) {
        console.error("There is something wrong with network call", error);
      } finally {
        setIsLoading(false);
      }
    },
    [pageNum]
  );

  useEffect(() => {
    getEmailList(pageNum); // fetch on
  }, [getEmailList]);

  const handlePagination = (pageNum) => {
    setPageNum(pageNum);
  };

  return (
    <div
      className={Boolean(openEmail) ? "list-container-half" : "list-container"}
    >
      {isLoading && <span>Loading...</span>}
      {Boolean(filterEmailList?.length) ? (
        filterEmailList?.map((email) => (
          <ListArticle
            data={email}
            openEmail={openEmail}
            setOpenEmail={setOpenEmail}
            currentClass={email?.id === openEmail?.id ? "current-email" : ""}
            readClass={
              email?.isRead && email?.id !== openEmail?.id ? "read-email" : ""
            }
            key={email?.id}
          />
        ))
      ) : (
        <p>No Data available at the moment !</p>
      )}

      {filter === "All" && (
        <section className='pagination'>
          <button
            disabled={pageNum < 2}
            onClick={() => handlePagination(pageNum - 1)}
          >
            &#8592;
          </button>
          <button
            disabled={pageNum > 1}
            onClick={() => handlePagination(pageNum + 1)}
          >
            &#8594;
          </button>
        </section>
      )}
    </div>
  );
}

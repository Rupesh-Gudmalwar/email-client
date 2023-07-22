import React, { useCallback, useEffect, useState } from "react";
import "./EmailBody.scss";
import { getEmailBodyApi } from "../../api/emailBody";
import { formatDate, timeFormat } from "../../utilities/functions";

export default function EmailBody({
  emailList,
  setEmailList,
  openEmail,
  setOpenEmail,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const getEmailBody = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const { data } = await getEmailBodyApi(id);
        if (data) {
          setOpenEmail((prev) => ({ ...prev, body: data?.body }));
          const readData = emailList?.map((each) =>
            each?.id === id ? { ...each, isRead: true } : { ...each }
          );
          setEmailList(readData);
        }
      } catch (error) {
        console.error("Error in fetching email body", error);
      } finally {
        setIsLoading(false);
      }
    },
    [openEmail?.id]
  );

  useEffect(() => {
    Boolean(openEmail) && getEmailBody(openEmail?.id);
  }, [getEmailBody]);

  function handleMarkAsFavorite(id) {
    const favData = emailList?.map((each) =>
      each?.id === id ? { ...each, isFavorite: true } : { ...each }
    );
    setEmailList(favData);
  }

  return (
    <div className={openEmail ? "body-container" : "display-none"}>
      {isLoading ? (
        <span className='flex justify-center items-center'>Loading...</span>
      ) : (
        <div className='email-body-wrapper'>
          <span className='avatar'>{openEmail?.from?.name?.[0]}</span>

          <section>
            <div className='flex justify-between items-center'>
              <h2>{openEmail?.subject}</h2>
              <span
                className='mark-favorite'
                onClick={() => handleMarkAsFavorite(openEmail?.id)}
              >
                Mark as favorite
              </span>
            </div>

            <span className='block my-4'>
              {openEmail?.date && formatDate(openEmail?.date)}{" "}
              {openEmail?.date && timeFormat(openEmail?.date)}
            </span>

            <p
              className='email-body'
              dangerouslySetInnerHTML={{ __html: openEmail?.body }}
            ></p>
          </section>
        </div>
      )}
    </div>
  );
}

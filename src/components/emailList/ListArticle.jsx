import React from "react";
import { formatDate, timeFormat } from "../../utilities/functions";

const ListArticle = React.memo(
  ({ data, openEmail, setOpenEmail, currentClass, readClass }) => {
    const handleOpenEmail = (data) => {
      if (openEmail?.id !== data?.id) {
        setOpenEmail(data);
      }
    };

    return (
      <article
        className={`list-article mb-4 cursor-pointer ${currentClass} ${readClass}`}
        key={data?.id}
        onClick={() => handleOpenEmail(data)}
      >
        <span className='avatar'>{data?.from?.name?.[0]}</span>
        <section>
          <p className='from'>
            <span>From:</span>
            <span className='name'>{data?.from?.name}</span>
            <span className='email'>{`<${data?.from?.email}>`}</span>
          </p>
          <p className='subject'>
            <span>Subject:</span>
            <span className='content'>{data?.subject}</span>
          </p>
          <p className={`short-desc ${openEmail?.id ? "text-truncate" : ""}`}>
            {data?.short_description}
          </p>
          <p className='date-fav'>
            <span className='date'>
              {data?.date ? formatDate(data?.date) : ""}{" "}
              {data?.date ? timeFormat(data?.date) : ""}
            </span>

            {data?.isFavorite && <span className='fav-tag ml-4'>Favorite</span>}
          </p>
        </section>
      </article>
    );
  }
);

export default ListArticle;
